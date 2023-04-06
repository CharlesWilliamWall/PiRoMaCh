<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { toCAD } from "@/utils/toCurrency";

const cartStore = useCartStore();
</script>

<template>
    <section>
        <div>
            <p>Sous-total :</p>
            <p>{{ toCAD(cartStore.subtotal) }}</p>
        </div>

        <div>
            <p>Livraison :</p>
            <p>{{ toCAD(cartStore.delivery) }}</p>
        </div>

        <div>
            <p>TPS :</p>
            <p>{{ toCAD(cartStore.gst) }}</p>
        </div>

        <div>
            <p>TVQ :</p>
            <p>{{ toCAD(cartStore.pst) }}</p>
        </div>

        <div class="total">
            <p>Total :</p>
            <p>{{ toCAD(cartStore.total) }}</p>
        </div>
    </section>
</template>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    gap: 3px;

    padding: 1rem;
    width: 28rem;
    color: var(--darkColor);
}
div {
    display: flex;
    justify-content: space-between;
}
.total {
    font-weight: bold;
}
@media print {
    section {
        font-size: 1.2rem;
    }
}
</style>
