import type Item from "./Item";
import type Invoice from "./Invoice";
import type User from "./User";

export default interface Order {
    id: Number;
    date: Date;
    address: Invoice["address"];
    payment: Invoice["payment"];
    items: Item[];
    subtotal: Number;
    delivery: Number;
    gst: Number;
    pst: Number;
    total: Number;
    user: User;
}
