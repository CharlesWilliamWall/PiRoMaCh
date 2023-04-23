<script setup lang="ts">
import { useAddressStore } from "@/stores/address";
import Address from "./Address.vue";
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

const userStore = useUserStore();
const addressStore = useAddressStore();

onMounted(() => {
    addressStore.isEditing = false;
});
</script>

<template>
    <div class="addresses-container">
        <button @click="addressStore.createAddress">
            + <br />
            Ajouter une adresse
        </button>

        <Address v-for="address in userStore.currentUser?.addresses" :key="address.fullName" :address="address" />
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
    box-shadow: 0 0 3px var(--itemBackdrop);
}

.addresses-container button:hover {
    background-color: var(--secondaryFeature);
    color: #fff;
}
</style>
