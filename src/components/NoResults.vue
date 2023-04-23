<script setup lang="ts"></script>
<template>
    <main>
        <h2>Aucun résultat trouvé !</h2>
        <h2 class="bottom-line">Modifiez votre recherche ou vos filtres.</h2>
    </main>
</template>

<style scoped>
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-image: url("../assets/images/emptyWallMuseum.jpg");
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
}
</style>
