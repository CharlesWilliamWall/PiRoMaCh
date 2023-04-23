<script setup lang="ts">
import ModalCenter from "@/components/modals/ModalCenter.vue";
import CartLayout from "@/layouts/CartLayout.vue";
import Cart from "../components/checkout/Cart.vue";
import Invoice from "../components/checkout/Invoice.vue";
import OrderBtn from "../components/checkout/OrderBtn.vue";
</script>

<template>
    <ModalCenter>
        <template #title> Panier </template>

        <CartLayout>
            <template #cart>
                <Cart />
            </template>

            <template #invoice>
                <Invoice />
            </template>

            <template #btn>
                <OrderBtn />
            </template>
        </CartLayout>
    </ModalCenter>
</template>

<style scoped></style>
