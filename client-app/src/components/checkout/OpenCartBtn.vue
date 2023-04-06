<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useModalStore } from "@/stores/modals";
import { shoppingBagIcon } from "@/assets/icons/index";

const modalStore = useModalStore();
const cartStore = useCartStore();
</script>

<template>
    <div
        :nbItemsInCart="cartStore.cartItems.length"
        :class="{ hide: cartStore.cartItems.length < 1 }"
        @click="modalStore.openModal('cart')"
    >
        <shoppingBagIcon />
    </div>
</template>

<style scoped>
div {
    position: relative;
    --nbItemsInCart: "99";
    content: none;
    cursor: pointer;
    padding-right: 2rem;
}
div::after {
    color: var(--primaryContent);
    text-shadow: 0 0 2px #fff;
    position: absolute;
    content: attr(nbItemsInCart);
    width: 50%;
    height: 50%;
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    top: 35%;
    left: 50%;
    padding-right: 2rem;
    transform: translate(-50%, 0);
    cursor: pointer;
}
.hide::after {
    display: none;
}
</style>
