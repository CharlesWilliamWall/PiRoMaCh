import { defineStore } from "pinia";
import { useUserStore } from "@/stores/user";
import type { Invoice } from "@/interfaces/Invoice";
import type { ItemInvoice } from "@/interfaces/Item";
import type { UserInvoice } from "@/interfaces/User";
import type InvoiceAddress from "@/interfaces/InvoiceAddress";
import type InvoiceCard from "@/interfaces/creditCard/InvoiceCard";

export const useInvoiceStore = defineStore("invoice", {
    state: (): Invoice => ({
        id: 0 as number,
        subtotal: 0 as number,
        delivery: 0 as number,
        gst: 0 as number,
        pst: 0 as number,
        total: 0 as number,
        date: new Date() as Date,
        items: [] as ItemInvoice[],
        address: {} as InvoiceAddress,
        payment: {} as InvoiceCard,
    }),
    getters: {},
    actions: {
        createInvoice(invoice: Invoice) {
            this.id = invoice.id;
            this.subtotal = invoice.subtotal;
            this.delivery = invoice.delivery;
            this.gst = invoice.gst;
            this.pst = invoice.pst;
            this.total = invoice.total;
            this.date = invoice.date;
            this.items = invoice.items;
            this.address = invoice.address;
            this.payment = invoice.payment;
        },
        recordAddress(address: InvoiceAddress) {
            const userStore = useUserStore();
            this.address = {
                fullName: address.fullName,
                email: userStore.currentUser?.email ? userStore.currentUser.email : address.email,
                phone: address.phone,
                line1: address.line1,
                line2: address.line2,
                instructions: address.instructions,
            };
        },
        recordPayment(payment: InvoiceCard) {
            this.payment = {
                cardName: payment.cardName,
                cardNumber: "**** " + payment.cardNumber.toString().slice(-4),
                cardExpiration: "**/**",
                cardVerificationNumber: "***",
            };
        },
        async saveInvoice() {
            const invoice: Invoice = {
                id: this.id,
                subtotal: this.subtotal,
                delivery: this.delivery,
                gst: this.gst,
                pst: this.pst,
                total: this.total,
                date: this.date,
                items: this.items,
                address: this.address,
                payment: this.payment,
            };
            try {
                const response = await fetch("http://localhost:3000/invoice/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(invoice),
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
});
