import axios from "axios";
import type CreditCard from "@/interfaces/creditCard/CreditCard";
import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import { useInvoiceStore } from "./invoice";
import type InvoiceCard from "@/interfaces/creditCard/InvoiceCard";
import { useCheckoutStore } from "./checkout";

export const useCreditCardStore = defineStore("creditCard", {
    state: () => ({
        isEditing: false,
        cardName: "" as string,
        cardNumber: "" as string,
        cardExpiration: "" as string,
        cardVerificationNumber: "" as string,
        isDefault: false as boolean,

        email: "" as string,
        InvoiceCard: {} as InvoiceCard,

        isLoading: false as boolean,
        errorMsg: "" as string,
        isValid: false as boolean,
    }),
    getters: {
        getGuestCreditCard: (state) => {
            return {
                cardName: state.cardName,
                cardNumber: state.cardNumber,
                cardExpiration: state.cardExpiration,
                cardVerificationNumber: state.cardVerificationNumber,
            };
        },
    },
    actions: {
        selectCard(creditCard: any) {
            const userStore = useUserStore();
            const checkoutStore = useCheckoutStore();

            checkoutStore.paymentConfirmed = true;
            checkoutStore.switchTo("confirm");
            const invoiceStore = useInvoiceStore();

            invoiceStore.recordPayment(creditCard);
        },
        async validateInvoiceCard() {
            this.errorMsg = "";
            this.isLoading = true;
            try {
                this.InvoiceCard = {
                    cardName: this.cardName,
                    cardNumber: this.cardNumber.toString(),
                    cardExpiration: this.cardExpiration.toString(),
                    cardVerificationNumber: this.cardVerificationNumber.toString(),
                };
                const response = await axios.post("/validate/creditCard", { creditCard: this.InvoiceCard });

                if (!response.data.isValid) this.errorMsg = "Veuillez remplir tous les champs requis";
                if (response.data.error) this.errorMsg = response.data.error;

                if (response.data.isValid) {
                    this.isEditing = false;
                    this.isValid = true;
                }
            } catch (error) {
                console.log(error);
                this.isValid = false;
            } finally {
                this.isLoading = false;
            }
        },
        async save() {
            const userStore = useUserStore();
            this.errorMsg = "";
            if (userStore.currentUser) {
                const email = userStore.currentUser?.email;
                const response = await axios.post("/api/users/addCard", {
                    email,
                    creditCard: {
                        cardName: this.cardName,
                        cardNumber: this.cardNumber,
                        cardExpiration: this.cardExpiration,
                        cardVerificationNumber: this.cardVerificationNumber,
                        isDefault: this.isDefault,
                    },
                });

                if (!response.data.error) {
                    userStore.currentUser.creditCards = response.data.creditCards;
                    this.isEditing = false;
                } else {
                    this.errorMsg = response.data.error;
                }
            } else {
                this.isEditing = false;
            }
        },
        async deleteCard(name: string) {
            const userStore = useUserStore();
            if (userStore.currentUser) {
                const email = userStore.currentUser?.email;
                const response = await axios.post("/api/users/deleteCard", {
                    email,
                    creditCard: {
                        cardName: name,
                    },
                });

                if (!response.data.error) {
                    userStore.currentUser.creditCards = response.data.creditCards;
                }
            }
        },
        editCard(creditCard: CreditCard) {
            this.cardName = creditCard.cardName;
            this.cardNumber = creditCard.cardNumber;
            this.cardExpiration = creditCard.cardExpiration;
            this.cardVerificationNumber = creditCard.cardVerificationNumber;
            this.isDefault = creditCard.isDefault;
            this.isEditing = true;
        },
        editCardGuest() {
            this.isEditing = true;
        },
        createCard() {
            this.cardName = "";
            this.cardNumber = "";
            this.cardExpiration = "";
            this.cardVerificationNumber = "";
            this.isDefault = false;
            this.isEditing = true;
        },
        makeDefault(creditCard: CreditCard) {
            const userStore = useUserStore();
            for (const creditCard of userStore.currentUser?.creditCards || []) {
                creditCard.isDefault = false;
            }
            creditCard.isDefault = true;
        },
    },
});
