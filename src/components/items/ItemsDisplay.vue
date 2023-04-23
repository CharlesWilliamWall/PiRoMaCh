<script setup lang="ts">
import TopBar from "./TopBar.vue";
import ItemsList from "./ItemsList.vue";
</script>

<template>
    <main>
        <TopBar />

        <ItemsList />
    </main>
</template>

<style scoped>
main {
    display: grid;
    grid-template-rows: 4.5rem 1fr;

    width: 100%;
    height: 100%;
}
</style>
