<script setup lang="ts">
import { useAddressStore } from "@/stores/address";
// import type Address from "@/interfaces/Address";

const addressStore = useAddressStore();

// const props = defineProps<{ address: Address }>();
</script>

<template>
    <main>
        <p>{{ addressStore.fullName }}</p>
        <p>{{ addressStore.email }}</p>
        <p>{{ addressStore.phone }}</p>
        <p>{{ addressStore.line1 }}</p>
        <p>{{ addressStore.line2 }}</p>
        <p>{{ addressStore.instructions }}</p>
        <div class="btn-address">
            <button class="btn-primary" @click="addressStore.selectAddress(addressStore.getGuestAddress)">
                Sélectionner
            </button>
            <button class="btn-secondary" @click="addressStore.editAddressGuest">Modifier</button>
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

.btn-address {
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
