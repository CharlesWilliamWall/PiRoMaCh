<script setup lang="ts"></script>

<template>
    <div class="container">
        <div class="top">
            <slot name="top"> </slot>
        </div>

        <div id="deliveryTab" class="delivery">
            <slot name="delivery"></slot>
        </div>

        <div id="paymentTab" class="payment">
            <slot name="payment"></slot>
        </div>

        <div id="confirmTab" class="confirm">
            <slot name="confirm"></slot>
        </div>

        <div class="invoice">
            <slot name="invoice"></slot>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    background-color: var(--secondaryLightColor);
    gap: 1rem;
    height: 100vh;
    width: 100vw;
    padding: 1rem;
    overflow: scroll;
    padding: 2rem;
}

.top {
    grid-area: 1 / 1 / 2 / 3;
    background-color: var(--secondaryFeature);
    width: 100%;
    height: 10vh;
}

h1 {
    font-size: 3rem;
    padding: 3rem;
    float: center;
}

.delivery {
    grid-area: 2 / 2 / 3 / 3;
}

.payment {
    grid-area: 3 / 2 / 4 / 3;
}
.confirm {
    grid-area: 4 / 2 / 5 / 3;
}
.cancel {
    grid-area: 5 / 2 / 6 / 3;
}

.invoice {
    grid-area: 2 / 1 / 6 / 2;
    justify-self: center;
    align-self: center;
}

.hidden {
    display: none;
}
</style>
