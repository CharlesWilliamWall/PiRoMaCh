<script setup lang="ts">
import ItemsPerPage from "./ItemsPerPage.vue";
import SortBy from "../filters/SortBy.vue";
import FilterBy from "../filters/FilterBy.vue";
</script>

<template>
    <div class="bar">
        <FilterBy />
        <SortBy />
        <ItemsPerPage />
    </div>
</template>

<style scoped>
.bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
}
</style>
