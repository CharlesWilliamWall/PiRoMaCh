<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import SmallModal from "./modals/SmallModal.vue";
import { useModalStore } from "@/stores/modals";
import { useUserStore } from "@/stores/user";
import type { UserSignIn } from "@/interfaces/User";
import { useRouter } from "vue-router";

const modalStore = useModalStore();
const userStore = useUserStore();
const router = useRouter();

const btnText = ref("Créer un compte");

const state = reactive<UserSignIn>({
    email: "",
    password: "",
});

const signIn = async () => {
    await userStore.signIn({ ...state });
    if (!userStore.error) {
        useModalStore().closeModal();
        router.push("/");
    } else {
        console.log(userStore.error);
    }
};
</script>
<template>
    <SmallModal v-if="modalStore.activeModal === 'logIn'">
        <template #title> Connexion </template>
        <input id="email" v-model="state.email" type="email" name="email" placeholder="Courriel" required />
        <input
            id="password"
            v-model="state.password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
        />
        <p v-if="userStore.error" class="error">Email ou mot de passe incorrect</p>
        <button @click="signIn">Se connecter</button>
        <div class="question">
            <p>Vous n'avez pas de compte ?</p>
            <p class="logIn" @click="modalStore.openModal('signUp')">Créer un compte</p>
        </div>
    </SmallModal>
</template>

<style scoped>
input {
    border: none;
    border-bottom: solid var(--secondaryFeature) 2px;
    outline: none;
    height: 4rem;
    width: 100%;
    padding: 0 0.5rem;
    background-color: rgba(0, 0, 0, 0);
    color: var(--darkColor);
    caret-color: var(--secondaryFeature);
    font-size: 2rem;
    font-family: "IBM Plex Serif", serif;
    font-weight: bold;
    margin-bottom: 3rem;
}
.noMatch {
    border-bottom: solid var(--accentColor) 2px;
}
.error {
    color: var(--accentColor);
}
button {
    padding: 1.5rem 1.5rem;
    cursor: pointer;
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--primaryLightColor);
    border: solid var(--secondaryFeature) 0.2rem;
    border-radius: 0.4rem;
    transition: 0.2s all linear;
    background-color: var(--secondaryFeature);
    width: 100%;
    margin-bottom: 3rem;
}
button:hover {
    background-color: var(--primaryContent);
    border-color: #fff;
    transition: 0.2s all linear;
}
.question {
    display: flex;
    justify-content: space-around;
}
.logIn {
    cursor: pointer;
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
    font-size: 1.5rem;
    color: #fff;
}
.logIn:hover {
    color: #000;
}
</style>
