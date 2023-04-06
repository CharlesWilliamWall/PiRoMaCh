<script setup lang="ts">
import { ref } from "vue";
import { minusIcon } from "@/assets/icons";
import { plusIcon } from "@/assets/icons";
import router from "@/router";
import { useInvoiceStore } from "@/stores/invoice";
import { useCheckoutStore } from "@/stores/checkout";
import { useOrderStore } from "@/stores/order";
import { useUserStore } from "@/stores/user";

const checkoutStore = useCheckoutStore();
const orderStore = useOrderStore();
const userStore = useUserStore();
const invoiceStore = useInvoiceStore();

let hiddenContent = ref(true);
const minus = minusIcon as any;
const plus = plusIcon as any;

const toggleContent = () => {
    hiddenContent.value = !hiddenContent.value;
};

const finishTransaction = () => {
    const invoiceStore = useInvoiceStore();
    invoiceStore.saveInvoice();
    router.push("/invoice");
};
</script>

<template>
    <div>
        <button
            v-if="checkoutStore.currentTab === 'confirm'"
            class="tabs accordion"
            @click="checkoutStore.switchTo('')"
        >
            Confirmer la commande

            <span class="icon">
                <minusIcon :src="minus" alt="minus" />
            </span>
        </button>

        <button v-else class="tabs accordion" @click="checkoutStore.switchTo('confirm')">
            Confirmer la commande

            <span class="icon">
                <plusIcon :src="plus" alt="plus" />
            </span>
        </button>

        <div v-if="checkoutStore.currentTab === 'confirm'" class="content active">
            <button class="btn-ternary" @click="finishTransaction">Conclure la transaction</button>
        </div>
    </div>
</template>

<style scoped>
.tabsBtn {
    background-color: var(--secondaryFeature);
    border: none;
    color: var(--secondaryLightColor);
    width: 28vw;
    padding: 1.5rem;
    text-align: center;
    display: inline-block;
    font-size: 2.5rem;
    margin: 2.5rem 0.5rem;
    cursor: pointer;
    border-radius: 5px;
}

.confirmation {
    display: flex;
    justify-content: center;
    /* margin: auto; */
    width: 100%;
    margin-top: 1rem;
}
.accordion:hover {
    background-color: var(--primaryContent);
}

.content {
    padding: 0 1rem;
    height: 30vh;
    width: 100%;
    transition: all 0.2s ease-out;
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
.btn-ternary {
    margin-top: 1rem;
}
</style>
