import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
    state: () => ({
        activeModal: "" as string,
        isVisible: false as boolean,
    }),
    getters: {},
    actions: {
        openModal(modalType: string): void {
            this.activeModal = modalType;
            this.isVisible = true;
        },
        closeModal(): void {
            this.isVisible = false;

            setTimeout(() => {
                this.activeModal = "";
            }, 300);
        },
    },
});
