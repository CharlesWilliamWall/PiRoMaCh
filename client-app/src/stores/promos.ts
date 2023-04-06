import axios from "@/utils/axios";
import { defineStore } from "pinia";
import type Promo from "@/interfaces/Promo";
import type { Item } from "@/interfaces/Item";

export const usePromosStore = defineStore("promos", {
    state: () => ({
        currentPromos: [] as Promo[],
        hourMillis: (1000 * 60 * 60) as number,
        minMillis: (1000 * 60) as number,
        timeRemaining: 10 as number,
        isPromoOver: false as boolean,
    }),
    getters: {},
    actions: {
        async createAndFetchPromosFromDB() {
            this.isPromoOver = false;
            try {
                const response = await axios.get(`/promotions/create`);
                this.currentPromos = response.data.promos;
            } catch (error) {
                this.currentPromos = [] as Promo[];
                console.log(error);
            }
        },
        async fetchPromosFromDB() {
            this.isPromoOver = false;
            try {
                const response = await axios.get(`/promotions/get`);
                this.currentPromos = response.data.promos;
            } catch (error) {
                this.currentPromos = [] as Promo[];
                console.log(error);
            }
        },
        isPromo(item: Item) {
            let isPromo = false;
            this.currentPromos.forEach((promo: Promo) => {
                if (promo.objectID == item.objectID) {
                    isPromo = true;
                }
            });
            return isPromo;
        },
        getDiscount(item: Item) {
            let discount: Number = 0;
            this.currentPromos.forEach((promo: Promo) => {
                if (promo.objectID === item.objectID) {
                    discount = promo.discount;
                }
            });
            return discount;
        },
        getDiscountedPrice(item: Item) {
            let discountedPrice = 0;
            this.currentPromos.forEach((promo) => {
                if (promo.objectID === item.objectID) {
                    discountedPrice = item.price - (item.price * promo.discount) / 100;
                }
            });
            return discountedPrice;
        },
        getEndDate() {
            return new Date(this.currentPromos[0].dateEnd);
        },
        calcRemaining() {
            const now = Date.now();
            const remaining = this.getEndDate().getTime() - now;
            this.timeRemaining = remaining;
        },
    },
});
