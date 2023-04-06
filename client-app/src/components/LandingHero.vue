<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function showBoutique() {
    return router.push(`/boutique`);
}
</script>

<template>
    <div class="landing-content">
        <p>Redéfinir <br />l'appartenance</p>
    </div>
</template>

<style scoped>
.landing-content {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    background: url("../assets/images/VanGogh2000crop.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 0.5rem;
    height: 50vh;
    margin-top: 1rem;
}
p {
    font-family: "IBM Plex Serif", serif;
    font-size: 8rem;
    color: #fff;
    text-shadow: 0 0 4px #000;

    padding-right: 2rem;
}
</style>
