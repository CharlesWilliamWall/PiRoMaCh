<script setup lang="ts">
import { RouterView } from "vue-router";
import { onBeforeMount, onMounted } from "vue";
import { usePromosStore } from "@/stores/promos";
import { useItemsStore } from "@/stores/items";
import { watch } from "vue";
import { useRoute } from "vue-router";

const itemsStore = useItemsStore();

const route = useRoute();

const promoStore = usePromosStore();

onBeforeMount(async () => {
    await promoStore.fetchPromosFromDB();
});

watch(
    () => route.params.objectID,
    async (newObjectID) => {
        if (newObjectID) {
            await itemsStore.fetchItemFromDB(newObjectID);
        }
    }
);
</script>

<template>
    <main>
        <RouterView v-slot="{ Component }">
            <Transition name="route" mode="out-in">
                <div :key="(route.name as string)">
                    <Component :is="Component" />
                </div>
            </Transition>
        </RouterView>
    </main>
</template>

<style scoped>
.route-enter-from {
    opacity: 0;
}
.route-leave-to {
    opacity: 0;
}
.route-enter-active,
.route-leave-active {
    transition: all 0.5s ease;
}
</style>
