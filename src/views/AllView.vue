<script setup lang="ts">
import BoutiqueView from "./BoutiqueView.vue";
import HeroView from "./LandingView.vue";
import Header from "@/components/header/HeadHome.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import router from "@/router";

const userStore = useUserStore();

const signOut = async () => {
    await userStore.signOut();
    router.push("/signin");
};
</script>

<template>
    <div class="all">
        <Header :is-authenticated="userStore.isAuthenticated" @sign-out="signOut" />
        <Transition name="fade" mode="out-in">
            <div class="containt">
                <div class="bou">
                    <HeroView />
                </div>
                <div class="bou">
                    <BoutiqueView />
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.containt {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-padding-top: 1px;
    scroll-behavior: smooth;
}
.bou {
    height: 100vh;
    scroll-snap-align: center;
}
</style>
