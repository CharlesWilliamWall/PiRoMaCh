<script setup lang="ts">
import { useCreditCardStore } from "@/stores/creditCard";

const creditCardStore = useCreditCardStore();
</script>

<template>
    <div class="card-form">
        <fieldset>
            <label for="name">Nom complet *</label>
            <input id="name" v-model="creditCardStore.cardName" type="text" name="name" required />
        </fieldset>

        <fieldset>
            <label for="cardNumber">Numero de carte de credit *</label>
            <input id="cardNumber" v-model="creditCardStore.cardNumber" type="number" name="card#" required />
        </fieldset>

        <fieldset>
            <label for="cardExpiration">Date d'expiration *</label>
            <input
                id="cardExpiration"
                v-model="creditCardStore.cardExpiration"
                type="text"
                name="cardExpiration"
                placeholder="MM/AAAA"
                required
            />
            <label for="cardVerificationNumber">Numero de verification *</label>
            <input
                id="CVN"
                v-model="creditCardStore.cardVerificationNumber"
                type="number"
                name="CVN"
                placeholder="CVV/CVC"
            />
        </fieldset>

        <fieldset class="checkbox-grp">
            <input id="is-default" v-model="creditCardStore.isDefault" type="checkbox" name="is-default" />
            <label for="is-default">Carte de crédit par défaut</label>
        </fieldset>

        <p>* Champ requis</p>

        <p v-if="creditCardStore.errorMsg" class="error">{{ creditCardStore.errorMsg }}</p>
        <button @click="creditCardStore.save">Sauvegarder</button>
        <button @click="creditCardStore.isEditing = false">Annuler</button>
    </div>
</template>

<style scoped>
.card-form {
    display: grid;
    gap: 1rem;
    width: 100%;
    /* max-width: 60rem; */
    margin: 0 auto;
    padding: 1rem;
}
fieldset {
    display: flex;
    flex-direction: column;
    gap: 5px;
    border: none;
}
label {
    font-weight: bold;
}
input[type="text"],
input[type="number"] {
    height: 3rem;
    font-size: 1.7rem;
    padding: 0 5px;
    border-radius: 5px;
}
.checkbox-grp {
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0 5px;
}
input[type="checkbox"] {
    height: 2rem;
}

.error {
    color: var(--errorColor);
    font-weight: bold;
    text-align: center;
}
</style>
