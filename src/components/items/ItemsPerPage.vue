<script setup lang="ts">
import { usePaginationStore } from "@/stores/pagination";
import FilterWrapper from "../filters/FilterWrapper.vue";

const paginationStore = usePaginationStore();
</script>
<template>
    <FilterWrapper>
        <select id="items-per-page" @change="paginationStore.setlimit($event)">
            <option value="12">12 œuvres / page</option>
            <option value="24">24 œuvres / page</option>
            <option value="36">36 œuvres / page</option>
        </select>
    </FilterWrapper>
</template>

<style scoped>
select {
    border: none;
    padding: 5px 0;
    background-color: inherit;
    cursor: pointer;

    text-shadow: 0 0 3px #fff;

    font-size: inherit;
    font-weight: inherit;
    font-family: inherit;
    transition: 0.2s all linear;
}
select:hover {
    color: var(--primaryFeature);
    transition: 0.2s all linear;
    text-shadow: none;
}
select:focus {
    outline: none;
}
</style>
