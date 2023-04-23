<script setup lang="ts">
import { onMounted } from "vue";
import { useAddressStore } from "@/stores/address";
import AddressGuest from "./AddressGuest.vue";
import AddressFormEditGuest from "./AddressFormEditGuest.vue";

const addressStore = useAddressStore();

onMounted(() => {
    addressStore.isEditing = true;
});
</script>

<template>
    <div class="addresses-container">
        <AddressFormEditGuest v-if="addressStore.isEditing" />
        <AddressGuest v-else />
    </div>
</template>

<style scoped>
.addresses-container {
    /* max-width: 90%; */
    width: 100%;
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
