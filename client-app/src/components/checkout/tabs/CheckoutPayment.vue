<script setup lang="ts">
import { minusIcon } from "@/assets/icons";
import { plusIcon } from "@/assets/icons";
import CreditsGuest from "../../user/creditCard/CreditsGuest.vue";
import { useCreditCardStore } from "@/stores/creditCard";
import { useUserStore } from "@/stores/user";
import Credits from "../../user/creditCard/Credits.vue";
import CreditFormEdit from "../../user/creditCard/CreditFormEdit.vue";
import { useCheckoutStore } from "@/stores/checkout";

const checkoutStore = useCheckoutStore();

const userStore = useUserStore();
const creditCardStore = useCreditCardStore();

const minus = minusIcon as any;
const plus = plusIcon as any;
</script>

<template>
    <div>
        <span v-if="checkoutStore.error" class="error">{{ checkoutStore.error }}</span>
        <button
            v-if="checkoutStore.currentTab === 'payment'"
            class="tabs accordion"
            @click="checkoutStore.switchTo('')"
        >
            Méthode de paiement

            <span class="icon">
                <minusIcon :src="minus" alt="minus" />
            </span>
        </button>

        <button v-else class="tabs accordion" @click="checkoutStore.switchTo('payment')">
            Méthode de paiement
            <span class="icon">
                <plusIcon :src="plus" alt="plus" />
            </span>
        </button>

        <div v-if="checkoutStore.currentTab === 'payment'" class="content">
            <Credits v-if="userStore.currentUser && !creditCardStore.isEditing"></Credits>
            <CreditFormEdit v-else-if="userStore.currentUser && creditCardStore.isEditing"></CreditFormEdit>
            <CreditsGuest v-else></CreditsGuest>
        </div>
    </div>
</template>

<style scoped>
.accordion:hover {
    background-color: var(--primaryContent);
}

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

.error {
    color: var(--errorColor);
    font-weight: bold;
    text-align: center;
    margin-left: 7rem;
}
</style>
