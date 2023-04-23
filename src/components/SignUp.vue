<script setup lang="ts">
import { ref, reactive } from "vue";
import SmallModal from "./modals/SmallModal.vue";
import { useModalStore } from "@/stores/modals";
import { useUserStore } from "@/stores/user";
import type { UserForm } from "@/interfaces/User";
import { useRouter } from "vue-router";

const modalStore = useModalStore();
const userStore = useUserStore();
const router = useRouter();

const isMatch = ref(true);

const state = reactive<UserForm>({
    email: "",
    password: "",
    confirm: "",
});

const signUp = async () => {
    await userStore.createUser({ ...state });
    if (!userStore.error) {
        router.push("/");
        useModalStore().closeModal();
    } else {
        console.log(userStore.error);
    }
};

const comparePassword = () => {
    if (state.password !== state.confirm) {
        isMatch.value = false;
    } else {
        isMatch.value = true;
    }
};

const removeError = () => {
    userStore.error = false;
};
</script>
<template>
    <SmallModal v-if="modalStore.activeModal === 'signUp'">
        <template #title> S'inscrire </template>
        <input
            id="email"
            v-model="state.email"
            type="email"
            name="email"
            placeholder="Adresse email"
            required
            @input="removeError"
        />
        <p v-if="userStore.error" class="error">Email deja utiliser</p>
        <input
            id="password"
            v-model="state.password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
        />
        <input
            id="confirm"
            v-model="state.confirm"
            type="password"
            name="confirm"
            placeholder="Confirmer le mot de passe"
            required
            :class="{ noMatch: !isMatch }"
            @input="comparePassword"
        />
        <div v-if="!isMatch">
            <p class="error2">les mots de passe ne sont pas identiques</p>
            <button disabled>Créer un compte</button>
        </div>
        <div v-else>
            <button @click="signUp">Créer un compte</button>
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

button:disabled {
    background-color: var(--primaryContent);
    border-color: #fff;
    transition: 0.2s all linear;
    cursor: not-allowed;
}
</style>
