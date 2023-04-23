<script setup lang="ts">
import CheckoutLayout from "@/layouts/CheckoutLayout.vue";
import CheckoutDelivery from "@/components/checkout/tabs/CheckoutDelivery.vue";
import CheckoutPayment from "@/components/checkout/tabs/CheckoutPayment.vue";
import CheckoutConfirm from "@/components/checkout/tabs/CheckoutConfirm.vue";
import CheckoutTop from "@/components/checkout/tabs/CheckoutTop.vue";
// import CheckoutInvoice from "@/components/checkout/tabs/CheckoutInvoice.vue";
</script>

<template>
    <CheckoutLayout class="wholeLayout">
        <template #top>
            <CheckoutTop />
        </template>

        <template #invoice>
            <CheckoutInvoice />
        </template>

        <template #delivery>
            <CheckoutDelivery />
        </template>

        <template #payment>
            <CheckoutPayment />
        </template>

        <template #confirm>
            <CheckoutConfirm />
        </template>
    </CheckoutLayout>
</template>

<style scoped>
.wholeLayout {
    overflow: auto;
}
</style>
