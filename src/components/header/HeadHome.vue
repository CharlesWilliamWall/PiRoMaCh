<script setup lang="ts">
import { logoIcon, logOutIcon, logInIcon, userIcon } from "@/assets/icons/index";
import SearchBar from "../filters/SearchBar.vue";
import CartBtn from "@/components/checkout/OpenCartBtn.vue";
import { useModalStore } from "@/stores/modals";
import signIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import CartView from "@/views/CartView.vue";
import ItemInfo from "@/components/items/ItemInfo.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const modalStore = useModalStore();

defineProps<{ isAuthenticated: boolean }>();
const emit = defineEmits<{
    (e: "signOut"): void;
}>();
</script>

<template>
    <header>
        <div class="logo">
            <a :href="$router.resolve({ name: 'home' }).href">
                <logoIcon />
            </a>
        </div>
        <div class="search">
            <SearchBar />
        </div>
        <div class="btnGroup">
            <CartBtn class="user" />
            <template v-if="user.isAuthenticated">
                <router-link to="/user" class="user"><userIcon /></router-link>
                <button class="btn-primary" @click="emit('signOut')">Déconnexion</button>
            </template>
            <template v-else>
                <router-link to="/signin">
                    <button class="btn-primary" @click="modalStore.openModal('logIn')">
                        <p class="text">Connexion</p>
                    </button>
                </router-link>
                <router-link to="/signup">
                    <button class="btn-secondary" @click="modalStore.openModal('signUp')">
                        <p class="text">Inscription</p>
                    </button>
                </router-link>
            </template>
        </div>

        <signIn v-if="modalStore.activeModal === 'logIn'" />
        <SignUp v-if="modalStore.activeModal === 'signUp'" />

        <CartView v-if="modalStore.activeModal === 'cart'" />

        <ItemInfo v-if="modalStore.activeModal === 'itemInfo'" />
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--secondaryLightColor);

    padding: 0 1rem;
}
a {
    text-decoration: none;
}

.btnGroup {
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
    overflow-y: hidden;
    margin-right: 1rem;
}

.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-left: 10rem;
}
</style>
