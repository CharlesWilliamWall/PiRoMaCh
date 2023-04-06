<script setup lang="ts">
import { minusIcon } from "@/assets/icons";
import { plusIcon } from "@/assets/icons";
import AddressesGuest from "../../user/addresses/AddressesGuest.vue";
import { useAddressStore } from "@/stores/address";
import { useUserStore } from "@/stores/user";
import Addresses from "../../user/addresses/Addresses.vue";
import AddressFormEdit from "../../user/addresses/AddressFormEdit.vue";
import { useCheckoutStore } from "@/stores/checkout";

const checkoutStore = useCheckoutStore();
const userStore = useUserStore();
const addressStore = useAddressStore();

const minus = minusIcon as any;
const plus = plusIcon as any;
</script>

<template>
    <div>
        <button
            v-if="checkoutStore.currentTab === 'delivery'"
            class="tabs accordion"
            @click="checkoutStore.switchTo('')"
        >
            Adresse de livraison

            <span class="icon">
                <minusIcon :src="minus" alt="minus" />
            </span>
        </button>

        <button v-else class="tabs accordion" @click="checkoutStore.switchTo('delivery')">
            Adresse de livraison
            <span class="icon">
                <plusIcon :src="plus" alt="plus" />
            </span>
        </button>

        <div v-if="checkoutStore.currentTab === 'delivery'" class="content">
            <Addresses v-if="userStore.currentUser && !addressStore.isEditing"></Addresses>
            <AddressFormEdit v-else-if="userStore.currentUser && addressStore.isEditing"></AddressFormEdit>

            <AddressesGuest v-else></AddressesGuest>
        </div>
    </div>
</template>

<style scoped>
.title {
    text-align: center;
    font-size: 2rem;
    margin: 1rem;
}

.icon {
    width: 4rem;
    height: 4rem;
    float: right;
}
</style>
