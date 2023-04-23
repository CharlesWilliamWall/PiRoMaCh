import type InvoiceAddress from "./Address";
import type CreditCard from "./creditCard/CreditCard";

export interface User {
    _id: string;
    email: string;
    password: string;
    confirm: string;
    addresses: [InvoiceAddress];
    creditCards: [CreditCard];
}

export type UserForm = Partial<User>;

export interface UserSignIn {
    email: string;
    password: string;
}
export interface UserInvoice {
    address: InvoiceAddress;
}
