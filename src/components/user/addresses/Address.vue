<script setup lang="ts">
import { useAddressStore } from "@/stores/address";
import type Address from "@/interfaces/Address";
import { useRoute } from "vue-router";

const route = useRoute();

const addressStore = useAddressStore();

const props = defineProps<{ address: Address }>();
</script>

<template>
    <main>
        <h4 v-if="address.isDefault">Adresse principale</h4>
        <br v-else />

        <p>{{ address.fullName }}</p>
        <p>{{ address.phone }}</p>
        <p>{{ address.line1 }}</p>
        <p>{{ address.line2 }}</p>
        <p>{{ address.instructions }}</p>
        <div class="btn-adress">
            <button v-if="route.path === '/checkout'" class="btn-primary" @click="addressStore.selectAddress(address)">
                Sélectionner
            </button>
            <button class="btn-secondary" @click="addressStore.editAddress(address)">Modifier</button>
            <button class="btn-cancel" @click="addressStore.deleteAddress(address.fullName)">Supprimer</button>
            <!-- <button v-if="!address.isDefault" @click="addressStore.makeDefault(address)">
                En faire l'adresse principale
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
