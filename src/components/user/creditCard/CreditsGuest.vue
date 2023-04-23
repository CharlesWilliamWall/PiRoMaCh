<script setup lang="ts">
import { onMounted } from "vue";
import { useCreditCardStore } from "@/stores/creditCard";
import CreditCardGuest from "./CreditCardGuest.vue";
import CreditFormEditGuest from "./CreditFormEditGuest.vue";

const CreditCardStore = useCreditCardStore();

onMounted(() => {
    CreditCardStore.isEditing = true;
});
</script>

<template>
    <div class="card-container">
        <CreditFormEditGuest v-if="CreditCardStore.isEditing" />
        <CreditCardGuest v-else />
    </div>
</template>

<style scoped>
.card-container {
    /* max-width: 90%; */
    width: 100%;
    border-radius: var(--radius);
    border: 1px solid var(--secondaryFeature);
    padding: 2rem;
}

.card-container button {
    background-color: var(--primaryFeature);
}

.card-container button:hover {
    background-color: var(--secondaryFeature);
}
</style>
