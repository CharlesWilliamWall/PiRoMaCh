import { useUserStore } from "@/stores/user";
import axios from "axios";
import type Address from "@/interfaces/Address";
import { defineStore } from "pinia";
import { useInvoiceStore } from "./invoice";
import type InvoiceAddress from "@/interfaces/InvoiceAddress";
import { useCheckoutStore } from "@/stores/checkout";

export const useAddressStore = defineStore("address", {
    state: () => ({
        isEditing: false,
        fullName: "" as string,
        phone: "" as string,
        line1: "" as string,
        line2: "" as string,
        instructions: "" as string,
        isDefault: false as boolean,

        email: "" as string,
        invoiceAddress: {} as InvoiceAddress,

        isLoading: false as boolean,
        errorMsg: "" as string,
        isValid: false as boolean,
    }),
    getters: {
        getGuestAddress: (state) => {
            return {
                fullName: state.fullName,
                phone: state.phone,
                line1: state.line1,
                line2: state.line2,
                instructions: state.instructions,
                email: state.email,
            };
        },
    },
    actions: {
        selectAddress(address: any) {
            const invoiceStore = useInvoiceStore();
            const checkoutStore = useCheckoutStore();

            checkoutStore.addressConfirmed = true;
            checkoutStore.switchTo("payment");
            invoiceStore.recordAddress(address);
        },
        async validateInvoiceAddress() {
            this.errorMsg = "";
            this.isLoading = true;
            try {
                this.invoiceAddress = {
                    fullName: this.fullName,
                    phone: this.phone,
                    line1: this.line1,
                    line2: this.line2,
                    instructions: this.instructions,
                    email: this.email,
                };

                const response = await axios.post("/validate/address", { address: this.invoiceAddress });

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

                const response = await axios.post("/api/users/addAddress", {
                    email,
                    address: {
                        fullName: this.fullName,
                        phone: this.phone,
                        line1: this.line1,
                        line2: this.line2,
                        instructions: this.instructions,
                        isDefault: this.isDefault,
                    },
                });

                if (!response.data.error) {
                    userStore.currentUser.addresses = response.data.addresses;
                    this.isEditing = false;
                } else {
                    this.errorMsg = response.data.error;
                }
            }
        },
        editAddress(address: Address) {
            this.fullName = address.fullName;
            this.phone = address.phone;
            this.line1 = address.line1;
            this.line2 = address.line2;
            this.instructions = address.instructions;
            this.isDefault = address.isDefault;
            this.isEditing = true;
        },
        editAddressGuest() {
            this.isEditing = true;
        },
        createAddress() {
            this.fullName = "";
            this.phone = "";
            this.line1 = "";
            this.line2 = "";
            this.instructions = "";
            this.isDefault = false;
            this.isEditing = true;
        },
        async deleteAddress(name: string) {
            const userStore = useUserStore();
            if (userStore.currentUser) {
                const email = userStore.currentUser?.email;

                const response = await axios.post("/api/users/deleteAddress", {
                    email,
                    address: {
                        fullName: name,
                    },
                });

                if (!response.data.error) {
                    userStore.currentUser.addresses = response.data.addresses;
                }
            }
        },
        makeDefault(address: Address) {
            const userStore = useUserStore();

            for (const adr of userStore.currentUser?.addresses || []) {
                adr.isDefault = false;
            }
            address.isDefault = true;
        },
    },
});
