<script setup lang="ts">
import { useItemsStore } from "@/stores/items";
import { usePaginationStore } from "@/stores/pagination";

const itemsStore = useItemsStore();
const paginationStore = usePaginationStore();
</script>

<template>
    <div v-if="itemsStore.items.length" class="pagination">
        <button :disabled="paginationStore.page === 1" @click="paginationStore.setPage(1)">|&lt;</button>
        <button :disabled="paginationStore.page === 1" @click="paginationStore.setPage(paginationStore.page - 1)">
            &lt;&lt;
        </button>
        <button
            v-for="page in paginationStore.pagesToShow"
            :key="page"
            class="page-numbers"
            :class="{ active: page === paginationStore.page }"
            @click="paginationStore.setPage(page)"
        >
            {{ page }}
        </button>
        <button
            :disabled="paginationStore.page === paginationStore.total"
            @click="paginationStore.setPage(paginationStore.page + 1)"
        >
            &gt;&gt;
        </button>
        <button
            :disabled="paginationStore.page === paginationStore.total"
            @click="paginationStore.setPage(paginationStore.total)"
        >
            &gt;|
        </button>
    </div>
</template>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
}

.pagination button {
    margin: 0 0.8rem;
    padding: 0.5rem 1rem;
    border: none;
    font-family: "Roboto Mono", monospace;
    font-weight: 400;
    font-size: 1.8rem;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
}

.pagination button:hover {
    color: var(--secondaryFeature);
    font-weight: bold;
    scale: 1.5;
}

.pagination button.active {
    border: solid var(--secondaryFeature) 0.2rem;
    border-radius: 0.5rem;
    scale: 1.2;
}

.pagination button:disabled {
    color: transparent;
    cursor: auto;
}
</style>
