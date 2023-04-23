import axios from "axios";
import { defineStore } from "pinia";
import type Order from "@/interfaces/Order";
import { useUserStore } from "./user";

export const useOrderStore = defineStore("order", {
    state: () => ({
        orders: [] as Order[],
    }),
    actions: {
        async getOrders() {
            const userStore = useUserStore();
            if (userStore.currentUser) {
                const email = userStore.currentUser?.email;
                const response = await axios.get(`/invoice/get/${email}`);
                this.orders = response.data.invoices;
            }
        },
    },
});
