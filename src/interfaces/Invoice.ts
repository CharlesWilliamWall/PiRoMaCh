import type { UserInvoice } from "./User";
import type { ItemInvoice } from "./Item";
import type InvoiceAddress from "./InvoiceAddress";
import type InvoiceCard from "./creditCard/InvoiceCard";

export interface Invoice {
    id: number;
    subtotal: number;
    delivery: number;
    gst: number;
    pst: number;
    total: number;
    date: Date;
    items: ItemInvoice[];
    address: InvoiceAddress;
    payment: InvoiceCard;
}

export interface Taxes {
    gst: number;
    pst: number;
}
