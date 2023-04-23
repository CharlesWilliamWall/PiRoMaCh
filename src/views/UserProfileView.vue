<script setup lang="ts">
import { ref, onMounted } from "vue";
import UserProfileLayout from "@/layouts/UserProfileLayout.vue";
import AddressFormEdit from "@/components/user/addresses/AddressFormEdit.vue";
import Addresses from "@/components/user/addresses/Addresses.vue";
import { useAddressStore } from "@/stores/address";
import CreditFormEdit from "@/components/user/creditCard/CreditFormEdit.vue";
import Credits from "@/components/user/creditCard/Credits.vue";
import { useCreditCardStore } from "@/stores/creditCard";
import AddressesGuest from "@/components/user/addresses/AddressesGuest.vue";
import { useUserStore } from "@/stores/user";
import Order from "@/components/user/orders/Order.vue";
import { useOrderStore } from "@/stores/order";
import HeadUser from "@/components/header/HeadUser.vue";

const userStore = useUserStore();
const addressStore = useAddressStore();
const cardStore = useCreditCardStore();
const orderStore = useOrderStore();

const currentTab = ref("addresses");

onMounted(() => {
    addressStore.isEditing = false;
    cardStore.isEditing = false;
});
</script>

<template>
    <div>
        <Head />
        <UserProfileLayout>
            <template #aside>
                <button class="btn sub-menu-btn" @click="currentTab = 'addresses'">Adresses</button>
                <button class="btn sub-menu-btn" @click="currentTab = 'creditCards'">Modes de paiement</button>
                <button class="btn sub-menu-btn" @click="currentTab = 'history'">Historique de commandes</button>
            </template>

            <template #default>
                <Addresses v-if="!addressStore.isEditing && currentTab === 'addresses'" />
                <AddressFormEdit v-if="addressStore.isEditing && currentTab === 'addresses'" />
                <Credits v-if="!cardStore.isEditing && currentTab === 'creditCards'" />
                <CreditFormEdit v-if="cardStore.isEditing && currentTab === 'creditCards'" />
                <Order v-if="currentTab === 'history'"></Order>
            </template>
        </UserProfileLayout>
    </div>
</template>

<style scoped>
.sub-menu-btn {
    width: 90%;
    text-align: left;
    margin: 1rem;
    background-color: var(--primaryFeature);
    box-shadow: 0 0 3px var(--itemBackdrop);
}
.sub-menu-btn:hover,
.sub-menu-btn:active {
    background-color: var(--secondaryFeature);
    color: #fff;
}
</style>
