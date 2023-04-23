<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { usePromosStore } from "@/stores/promos";
import { useItemsStore } from "@/stores/items";
import { useModalStore } from "@/stores/modals";
import router from "@/router";
import type CartViewVue from "@/views/CartView.vue";

const cartStore = useCartStore();
const promoStore = usePromosStore();
const itemsStore = useItemsStore();
const modalStore = useModalStore();
const isEmpty = false;

function endTransaction() {
    cartStore.sendInvoiceInfo();
    cartStore.handleOrder();
    router.push("/checkout");
    modalStore.closeModal();
    cartStore.sendInvoiceInfo();
}
</script>

<template>
    <div v-if="cartStore.cartItems.length > 0">
        <button class="btn-primary" @click="endTransaction">Commander</button>
    </div>
    <div v-else class="emptyCart">
        <p>Votre panier est vide</p>
    </div>
</template>

<style scoped>
button {
    width: 100%;
}
button:hover {
    background-color: var(--primaryContent);
    border-color: #fff;
    transition: 0.2s all linear;
}
.emptyCart {
    display: flex;
    position: absolute;
    top: 40%;
    width: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    height: 8rem;
    backdrop-filter: blur(10px);
    justify-content: flex-start;
    padding-left: 8%;
    align-items: center;
    font-weight: bold;
    font-size: 2.5rem;
    color: var(--darkColor);
    text-shadow: 0px 0px 3px var(--primaryFeature);
}
</style>
