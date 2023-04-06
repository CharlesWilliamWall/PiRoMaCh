<script setup lang="ts">
import BoutiqueLayout from "@/layouts/BoutiqueLayout.vue";
import ItemsDisplay from "@/components/items/ItemsDisplay.vue";
import Pagination from "@/components/items/Pagination.vue";
import Filters from "@/components/filters/FilterMenu.vue";

import { useModalStore } from "@/stores/modals";

const modalStore = useModalStore();
</script>

<template>
    <BoutiqueLayout>
        <template #default>
            <ItemsDisplay />
        </template>

        <template #pagination>
            <Pagination />
        </template>

        <template #filters>
            <Filters />
        </template>
    </BoutiqueLayout>
</template>

<style scoped></style>
