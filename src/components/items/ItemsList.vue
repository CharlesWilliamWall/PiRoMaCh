<script setup lang="ts">
import { onMounted } from "vue";
import { useItemsStore } from "@/stores/items";
import ItemCard from "@/components/items/ItemCard.vue";
import NoResults from "../NoResults.vue";
import Spinner from "../misc/Spinner.vue";

const itemsStore = useItemsStore();

onMounted(async () => {
    await itemsStore.fetchItemsFromDB();
});
</script>

<template>
    <div v-if="itemsStore.items.length && !itemsStore.isLoadingItems" class="items-list">
        <ItemCard v-for="item in itemsStore.items" :key="item.objectID" :item="item" />
    </div>

    <div v-else-if="itemsStore.isLoadingItems">
        <Spinner />
    </div>

    <div v-else>
        <NoResults />
    </div>
</template>

<style scoped>
.items-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    height: 80vh;
    width: 100%;
    padding: 1rem;
    overflow: auto;
}
</style>
