<script setup lang="ts">
import { ref } from "vue";
import Invoice from "../Invoice.vue";
import { useCartStore } from "@/stores/cart";
import Cart from "../Cart.vue";
import truncateString from "@/utils/truncate";
import { useRouter } from "vue-router";
import NotFound404 from "../../NotFound404.vue";
import { useModalStore } from "@/stores/modals";
import { useInvoiceStore } from "@/stores/invoice";

const isPrinted = ref(false);
const router = useRouter();

const cart = Cart;
const cartStore = useCartStore();

const modalStore = useModalStore();
const closeModal = () => {
    modalStore.closeModal();
};

const invoiceStore = useInvoiceStore();
const itemSubtotal = cartStore.cartItems[0].price * cart.quantity;
let todayDate = new Date().toLocaleDateString();
let delDate = new Date(14).toLocaleDateString();

const printInvoice = () => {
    window.print();
    isPrinted.value = true;
};

const goHome = () => {
    router.push("/");
    closeModal();
    cartStore.clearCart();
};
</script>

<template>
    <div v-if="cartStore.cartItems.length > 0" class="cart print">
        <h2>#Facture SEMU{{ ("00000" + invoiceStore.id.toString()).slice(-5) }}</h2>
        <p>Commande passée le:</p>
        <p>{{ new Date(invoiceStore.date).toLocaleDateString() }}</p>
        <div class="separator"></div>
        <div class="invoiceDetails">
            <div class="semuInfo">
                <h3>Semu:</h3>
                <p>123 quelque part</p>
                <p>514 514 51444</p>
            </div>
            <div class="clientInfo">
                <h3>Client:</h3>
                <p>{{ invoiceStore.address.fullName }}</p>
                <p>{{ invoiceStore.address.email }}</p>
                <p>{{ invoiceStore.address.phone }}</p>
                <p>{{ invoiceStore.address.line1 }}</p>
                <p>{{ invoiceStore.address.line2 }}</p>
                <p>{{ invoiceStore.payment.cardNumber }}</p>
            </div>
        </div>
        <table class="table">
            <thead>
                <tr class="tableHeader">
                    <th>Id</th>
                    <th>Oeuvre</th>
                    <th>Prix un.</th>
                    <th>Qté</th>
                    <th>Sous-total</th>
                </tr>
            </thead>
            <tbody class="tableBody">
                <tr v-for="item in invoiceStore.items" :key="item.title">
                    <td>{{ item.objectID }}</td>
                    <td>{{ truncateString(item.title, 25) }}</td>
                    <td>{{ item.price.toFixed(2) }} $</td>
                    <td>{{ item.quantity }}</td>
                    <td>{{ item.subtotal.toFixed(2) }} $</td>
                </tr>
            </tbody>
        </table>

        <div class="invoice print">
            <Invoice />
        </div>
        <button v-if="cartStore.cartItems.length > 0" class="btn-secondary noprint" @click="printInvoice">
            Imprimer la facture
        </button>
        <button class="btn-primary noprint" @click="goHome">Accueil</button>
    </div>
</template>

<style scoped>
.cart {
    justify-content: space-between;
    margin: 0 auto;
    max-width: 800px;
    height: 100vh;
    padding: 2rem;
    display: grid;
    overflow-y: auto;
    display: block;
    background-color: var(--secondaryLightColor);
}

.separator {
    border: solid 0.1rem var(--primaryContent);
    margin-top: 1rem;
    margin-bottom: 1rem;
}
.invoiceDetails {
    color: var(--primaryText);
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.semuInfo {
    text-align: center;
}
.clientInfo {
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid var(--secondaryFeature);
    margin: 1rem 0;
    font-size: 1.5rem;
}

th {
    padding: 1rem 0;
    background-color: var(--secondaryFeature);
    color: var(--primaryText);
}
td {
    padding: 1rem;
    text-align: left;
}

tr {
    text-align: center;
}
.invoice {
    display: flex;
    justify-content: flex-end;
}
@media print {
    .cart,
    .invoice,
    table {
        display: block;
        overflow: unset;
        line-height: normal;
        font-size: 1.2rem;
        text-align: left;
        text-justify: left;
    }
    .noprint {
        display: none;
    }
}
</style>
