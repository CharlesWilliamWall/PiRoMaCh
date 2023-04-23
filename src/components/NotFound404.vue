<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goToHome = () => {
    router.push("/");
};
</script>
<template>
    <main>
        <h2>Erreur 404</h2>
        <h2 class="bottom-line">Malheureusement, cette page n'existe pas.</h2>
        <button class="btn" @click="goToHome">Retourner à l'accueil</button>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url("../assets/images/404.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
}
h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    font-family: "IBM Plex Serif", serif;
    font-size: 3rem;
    text-shadow: 1px 1px 2px var(--primaryFeature);
    padding-right: 5rem;
}
.bottom-line {
    margin-bottom: 5rem;
    font-size: 2.7rem;
}

.btn {
    width: 30rem;
    margin: 0 auto;
    padding: 2rem;
    background: var(--secondaryFeature);
    color: var(--primaryLightColor);
}
</style>
