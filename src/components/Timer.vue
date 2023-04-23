<script setup lang="ts">
import { ref, computed } from "vue";
import { usePromosStore } from "@/stores/promos";
import { useItemsStore } from "@/stores/items";

const promosStore = usePromosStore();
const itemsStore = useItemsStore();

var dayMillis = 1000 * 60 * 60 * 24;
var hourMillis = 1000 * 60 * 60;
var minMillis = 1000 * 60;

const beginDate = new Date(2023, 0, 11);

const remaining = ref(promosStore.timeRemaining);

if (remaining.value < hourMillis + 10) {
    setTimeout(() => {
        setInterval(() => {
            promosStore.calcRemaining();
            remaining.value = promosStore.timeRemaining;
            if (remaining.value <= 0) {
                promosStore.isPromoOver = true;
                promosStore.fetchPromosFromDB();
                itemsStore.fetchPromoItemsFromDB();
            }
        }, 1000);
    }, 1000);
} else {
    setInterval(() => {
        promosStore.calcRemaining();
        remaining.value = promosStore.timeRemaining;
    }, minMillis);
}

const days = computed(() => Math.floor(remaining.value / dayMillis));
const hours = computed(() => Math.floor((remaining.value % dayMillis) / hourMillis));
const minutes = computed(() => Math.floor(((remaining.value % dayMillis) % hourMillis) / minMillis));
const seconds = computed(() => Math.floor((((remaining.value % dayMillis) % hourMillis) % minMillis) / 1000));
</script>

<template>
    <div class="timer">
        <p v-if="days > 0">{{ days }}j {{ hours }}h</p>
        <p v-if="days <= 0 && hours > 1">{{ hours }}h {{ minutes }}m</p>
        <p v-if="days === 0 && hours <= 1">{{ hours }}h {{ minutes }}m {{ seconds }}s</p>
    </div>
</template>

<style scoped>
div {
    background-color: var(--primaryFeature);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: 100%;
    width: 100%;
    padding: 5px;
    border-radius: 8px;
    font-weight: bold;
    box-shadow: 0 0 3px var(--itemBackdrop);
}
div p {
    font-weight: bold;
}
</style>
