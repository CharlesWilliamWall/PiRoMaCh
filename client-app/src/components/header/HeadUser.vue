<script setup lang="ts">
import { logoIcon, logOutIcon, xIcon, userIcon } from "@/assets/icons/index";
import CartBtn from "@/components/checkout/OpenCartBtn.vue";
import { useModalStore } from "@/stores/modals";
import signIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import CartView from "@/views/CartView.vue";
import ItemInfo from "@/components/items/ItemInfo.vue";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const modalStore = useModalStore();
</script>

<template>
    <header>
        <div class="logo">
            <a :href="$router.resolve({ name: 'home' }).href">
                <logoIcon />
            </a>
        </div>
        <div class="search">
            <h2>Profil Utilisateur</h2>
        </div>
        <div class="btn-right">
            <CartBtn class="user" />
            <template v-if="user.isAuthenticated">
                <router-link to="/" class="user"><xIcon class="x" /></router-link>
            </template>
        </div>
        <CartView v-if="modalStore.activeModal === 'cart'" />

        <ItemInfo v-if="modalStore.activeModal === 'itemInfo'" />
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
a {
    text-decoration: none;
}

button {
    font-family: "Roboto Mono", monospace;
    border: none;
    border-radius: var(--radius);
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 1rem;
    text-transform: uppercase;
    transition: all 0.3s;
    margin: 0.5rem;
}

.btn-right {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.logo {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 1.5rem;
}

.user {
    display: flex;
    margin-right: 1rem;
}

.x {
    color: var(--primaryContent);
}

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-left: 10rem;
}

h2 {
    color: var(--primaryContent);
}
</style>
