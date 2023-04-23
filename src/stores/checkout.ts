import { defineStore } from "pinia";

const defaultValues = {
    currentTab: "delivery",
    addressConfirmed: false,
    paymentConfirmed: false,
    error: "",
};

export const useCheckoutStore = defineStore("checkout", {
    state: () => ({
        currentTab: "delivery" as string,
        addressConfirmed: false as boolean,
        paymentConfirmed: false as boolean,
        error: "" as string,
    }),
    getters: {},
    actions: {
        switchTo(tab: string) {
            this.error = "";

            if (tab === "delivery" || tab === "") {
                this.currentTab = tab;
                return;
            }

            if (tab === "payment") {
                if (this.addressConfirmed) {
                    this.currentTab = tab;
                } else {
                    this.error = "Veuillez sélectionner une adresse pour continuer";
                }
                return;
            }

            if (tab === "confirm") {
                if (this.addressConfirmed && this.paymentConfirmed) {
                    this.currentTab = tab;
                } else {
                    this.error = "Veuillez sélectionner un mode de paiement pour continuer";
                }
                return;
            }
        },
        resetToDefault() {
            this.currentTab = defaultValues.currentTab;
            this.addressConfirmed = defaultValues.addressConfirmed;
            this.paymentConfirmed = defaultValues.paymentConfirmed;
            this.error = defaultValues.error;
        },
    },
});
