import type { Invoice } from "@/interfaces/Invoice";
import type Item from "@/interfaces/Item";

export interface Cart {
    items: Array<Item>;
    invoice: Invoice;
}
