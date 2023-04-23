<script setup lang="ts">
import { useFiltersStore } from "@/stores/filters";
import FilterWrapper from "./FilterWrapper.vue";

const filterStore = useFiltersStore();
</script>
<template>
    <FilterWrapper>
        <select id="sort-by" @change="filterStore.updateSortAndGetItems(($event.target as HTMLSelectElement).value)">
            <option value="-rating" class="selectElement">↓ Plus aimé au moins aimé</option>
            <option value="rating" class="selectElement">↑ Moins aimé au plus aimé</option>
            <option value="-price" class="selectElement">↓ Plus cher au moins cher</option>
            <option value="price" class="selectElement">↑ Moins cher au plus cher</option>
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
