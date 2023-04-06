<script setup lang="ts">
import { searchIcon } from "@/assets/icons/index";
import { useFiltersStore } from "@/stores/filters";

const filtersStore = useFiltersStore();
</script>

<template>
    <div>
        <input v-model="filtersStore.search" type="search" placeholder="Recherche..." @input="filtersStore.searchDB" />
        <searchIcon @click="filtersStore.searchDB" />
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
}
input {
    border: none;
    border-bottom: solid var(--secondaryFeature) 2px;
    outline: none;
    height: 4rem;
    width: 25rem;
    padding: 0 0.5rem;
    background-color: rgba(0, 0, 0, 0);
    background-blend-mode: luminosity;
    color: var(--darkColor);
    caret-color: var(--secondaryFeature);
    font-size: 2rem;
    font-family: "IBM Plex Serif", serif;
    font-weight: bold;
}
</style>
