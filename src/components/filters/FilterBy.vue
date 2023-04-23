<script setup lang="ts">
import FilterWrapper from "./FilterWrapper.vue";
import { filterIcon } from "@/assets/icons/index";
import { useModalStore } from "@/stores/modals";

const modalStore = useModalStore();
</script>
<template>
    <FilterWrapper class="clickable" @click="modalStore.openModal('filters')">
        <filterIcon />
        <label>Filtres</label>
    </FilterWrapper>
</template>

<style scoped>
.clickable {
    text-shadow: 0 0 3px #fff;
    transition: 0.2s all linear;
}
.clickable:hover {
    color: var(--primaryFeature);
    transition: 0.2s all linear;
    text-shadow: none;
}

.clickable,
.clickable label {
    color: var(--darkColor);
    cursor: pointer;
}
label {
    padding: 5px 0;
}
label:hover,
label:active {
    color: var(--primaryFeature);
    transition: 0.2s all linear;
}
</style>
