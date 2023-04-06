<!-- <script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import SmallModal from "./modals/SmallModal.vue";
import { useModalStore } from "@/stores/modals";
import { useUserStore } from "@/stores/user";
import type { UserForm, UserSignIn } from "@/interfaces/User";
import { useRouter } from "vue-router";

const modalStore = useModalStore();
const userStore = useUserStore();
const router = useRouter();

const modalTitle = ref("Connexion");
const isMatch = ref(true);
const hasAccount = ref(true);
const btnText = ref("Créer un compte");

const state = reactive<UserForm & UserSignIn>({
    email: "",
    password: "",
});

const signUpIn = async () => {
    if (!hasAccount.value) {
        await userStore.createUser({ ...state });
        if (!userStore.error) {
            console.log("user created");
            console.log("has account value" + hasAccount.value);
            useModalStore().closeModal();
        } else {
            console.log(userStore.error);
        }
    }
    if (hasAccount.value) {
        await userStore.signIn({ ...state });
        if (!userStore.error) {
            console.log("user connected");
            console.log("has account value" + hasAccount.value);
            useModalStore().closeModal();
        } else {
            console.log(userStore.error);
        }
    }
};

// function connect(event: Event) {
//     const form: HTMLFormElement = event.target as HTMLFormElement;

//     const inEmail: HTMLInputElement = document.getElementById("email") as HTMLInputElement;

//     const inPassword: HTMLInputElement = document.getElementById("password") as HTMLInputElement;

//     const inConfirm: HTMLInputElement = document.getElementById("confirm") as HTMLInputElement;
//     if (inConfirm) {
//         if (inPassword.value !== inConfirm.value) {
//             isMatch.value = false;
//         } else {
//             isMatch.value = true;
//         }
//     }
// }
</script>
<template>
    <SmallModal v-if="modalStore.activeModal === 'logIn'">
        <template #title> {{ modalTitle }} </template>
        <input id="email" v-model="state.email" type="email" name="email" placeholder="Courriel" required />
        <input
            id="password"
            v-model="state.password"
            type="password"
            name="password"
            placeholder="Mot de passe"
            required
        />
        <input
            v-if="!hasAccount"
            id="confirm"
            type="password"
            name="confirm"
            placeholder="Confirmation de mot de passe"
            required
            :class="{ noMatch: !isMatch }"
        />
        <p v-if="!isMatch" class="error">les mots de passe ne sont pas identiques</p>
        <button @click="signUpIn">{{ btnText }}</button>
        <div class="question">
            <p v-if="!hasAccount">Vous avez déjà un compte ?</p>
            <p
                v-if="!hasAccount"
                class="logIn"
                @click="
                    hasAccount = true;
                    isMatch = true;
                    btnText = 'Se connecter';
                    modalTitle = 'Connexion';
                "
            >
                Se connecter
            </p>
            <p v-if="hasAccount">Vous n'avez pas de compte ?</p>
            <p
                v-if="hasAccount"
                class="logIn"
                @click="
                    hasAccount = false;
                    btnText = 'Créer un compte';
                    modalTitle = 'Inscription';
                "
            >
                S'inscrire
            </p>
        </div>
    </SmallModal>
</template> -->

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
