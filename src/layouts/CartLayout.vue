<script setup lang="ts"></script>

<template>
    <section>
        <main class="cart">
            <slot name="cart"></slot>
        </main>

        <div class="invoice">
            <slot name="invoice"></slot>
        </div>

        <div class="order-btn">
            <slot name="btn"></slot>
        </div>
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: 1fr 28rem;
    grid-template-rows: 7rem 1fr 20rem 7rem;
    grid-template-areas:
        "cart ."
        "cart ."
        "cart invoice"
        "cart order-btn";

    height: 100%;
    width: 100%;
    gap: 1rem;
}
.cart {
    grid-area: cart;

    height: 100%;
    overflow: auto;
}
.invoice {
    grid-area: invoice;

    align-self: center;
}
.order-btn {
    grid-area: order-btn;

    display: flex;
    justify-content: center;
    align-items: center;
    height: 7rem;
    align-self: end;
}
</style>
