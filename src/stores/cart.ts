import axios from "../utils/axios";
import { defineStore } from "pinia";
import { useItemsStore } from "@/stores/items";
import { usePromosStore } from "@/stores/promos";
import { useUserStore } from "@/stores/user";
import { useInvoiceStore } from "./invoice";
import type { Item, ShortItem } from "@/interfaces/Item";
import { taxes } from "@/assets/data/config.json";
import router from "@/router";

export const useCartStore = defineStore("cart", {
    state: () => ({
        cartItems: [] as Item[],
        showAddedToCart: -1 as number,
        shortCartItems: [] as ShortItem[],
    }),
    getters: {
        subtotal(): number {
            const promosStore = usePromosStore();

            let total = 0;
            for (const item of this.cartItems) {
                let itemPrice;
                promosStore.isPromo(item)
                    ? (itemPrice = promosStore.getDiscountedPrice(item))
                    : (itemPrice = item.price);

                if (item.quantity) total += itemPrice * item.quantity;
            }
            return total;
        },
        delivery(): number {
            return this.subtotal < 200 && this.subtotal !== 0 ? 15 : 0;
        },
        gst(): number {
            return (this.subtotal + this.delivery) * taxes.gst;
        },
        pst(): number {
            return (this.subtotal + this.delivery) * taxes.pst;
        },
        total(): number {
            return this.subtotal + this.delivery + this.gst + this.pst;
        },
    },
    actions: {
        addToCart(item: Item) {
            const itemsStore = useItemsStore();
            itemsStore.currentItem = item;

            this.showAddedToCart = item.objectID;
            setTimeout(() => {
                this.showAddedToCart = -1;
            }, 2000);
            const itemInCart = this.cartItems.filter((i) => i.objectID === item.objectID);

            if (itemInCart.length && itemInCart[0].quantity) {
                itemInCart[0].quantity++;
            } else {
                item.quantity = 1;
                this.cartItems.push(item);
            }
        },

        removeFromCart(itemToRemove: Item): void {
            for (let i = 0; i < this.cartItems.length; i++) {
                if (this.cartItems[i].objectID === itemToRemove.objectID) {
                    this.cartItems.splice(i, 1);
                }
            }
        },

        clearCart(): void {
            this.cartItems = [];
        },

        async handleOrder() {
            router.push("/checkout");
        },

        shortenItems() {
            this.shortCartItems = this.cartItems.map(({ objectID, quantity }) => ({
                objectID,
                quantity,
            }));
        },

        async sendInvoiceInfo() {
            const userStore = useUserStore();
            const invoiceStore = useInvoiceStore();
            this.shortenItems();
            const orderInfo = {
                subtotal: this.subtotal,
                delivery: this.delivery,
                gst: this.gst,
                pst: this.pst,
                total: this.total,
                date: new Date(),
                usrID: userStore.currentUser?._id,
                items: this.shortCartItems,
            };

            try {
                const response = await fetch("http://localhost:3000/invoice", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderInfo),
                });
                const data = await response.json();
                invoiceStore.createInvoice(data);
            } catch (error) {
                console.log(error);
            }
        },
    },
});
