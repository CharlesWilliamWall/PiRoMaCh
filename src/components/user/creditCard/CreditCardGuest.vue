<script setup lang="ts">
import { useCreditCardStore } from "@/stores/creditCard";

const creditCardStore = useCreditCardStore();
</script>

<template>
    <main>
        <p>{{ creditCardStore.cardName }}</p>
        <p>{{ creditCardStore.cardNumber }}</p>
        <p>{{ creditCardStore.cardExpiration }}</p>
        <p>{{ creditCardStore.cardVerificationNumber }}</p>
        <div class="btn-card">
            <button class="btn-primary" @click="creditCardStore.selectCard(creditCardStore.getGuestCreditCard)">
                Sélectionner
            </button>
            <button class="btn-secondary" @click="creditCardStore.editCardGuest">Modifier</button>
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: var(--primaryContent);
    border-radius: var(--radius);
    border: 1px solid var(--secondaryFeature);
    padding: 1rem;
    width: 100%;
    color: var(--primaryLightColor);
}

.btn-card {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
}

button {
    padding: 1rem;
    color: #fff;
}
</style>
