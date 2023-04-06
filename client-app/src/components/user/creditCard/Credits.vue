<script setup lang="ts">
import { useCreditCardStore } from "@/stores/creditCard";
import { useUserStore } from "@/stores/user";
import Credit from "./Credit.vue";
import { onMounted } from "vue";

const userStore = useUserStore();
const CreditCardStore = useCreditCardStore();

onMounted(() => {
    CreditCardStore.isEditing = false;
});
</script>

<template>
    <div class="addresses-container">
        <button @click="CreditCardStore.createCard">
            + <br />
            Ajouter une carte de credit
        </button>

        <Credit
            v-for="creditCard in userStore.currentUser?.creditCards"
            :key="creditCard.cardNumber"
            :credit-card="creditCard"
        />
    </div>
</template>

<style scoped>
.addresses-container {
    margin: 0 auto;
    display: grid;
    grid-template-rows: 0.5fr 1fr 1fr;
    gap: 2.5rem;
    width: 100%;
    /* max-width: 90%; */
    border-radius: var(--radius);
    border: 1px solid var(--secondaryFeature);
    padding: 2rem;
}

.addresses-container button {
    background-color: var(--primaryFeature);
}

.addresses-container button:hover {
    background-color: var(--secondaryFeature);
}
</style>
