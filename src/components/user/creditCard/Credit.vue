<script setup lang="ts">
import type CreditCard from "@/interfaces/creditCard/CreditCard";
import { useCreditCardStore } from "@/stores/creditCard";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

const CreditCardStore = useCreditCardStore();

const props = defineProps<{ creditCard: CreditCard }>();

onMounted(() => {
    console.log(route.path);
});
</script>

<template>
    <main>
        <h4 v-if="creditCard.isDefault">Carte de credit principale</h4>
        <br v-else />

        <p>{{ creditCard.cardName }}</p>
        <p>{{ creditCard.cardNumber }}</p>
        <p>{{ creditCard.cardExpiration }}</p>
        <p>{{ creditCard.cardVerificationNumber }}</p>
        <p v-if="CreditCardStore.errorMsg" class="error">{{ CreditCardStore.errorMsg }}</p>
        <div class="btn-adress">
            <button
                v-if="route.path === '/checkout'"
                class="btn-primary"
                @click="CreditCardStore.selectCard(creditCard)"
            >
                Sélectionner
            </button>
            <button class="btn-secondary" @click="CreditCardStore.editCard(creditCard)">Modifier</button>
            <button class="btn-cancel" @click="CreditCardStore.deleteCard(creditCard.cardName)">Supprimer</button>
            <!-- <button v-if="!creditCard.isDefault" @click="CreditCardStore.makeDefault(creditCard)">
                En faire la carte de credit principale
            </button> -->
        </div>
    </main>
</template>

<style scoped>
main {
    background-color: var(--primaryContent);
    border-radius: var(--radius);
    border: 1px solid var(--secondaryFeature);
    padding: 1rem;
    color: var(--primaryLightColor);
}

.btn-adress {
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    margin-top: 1rem;
}
button {
    padding: 1rem;
    color: #fff;
}
</style>
