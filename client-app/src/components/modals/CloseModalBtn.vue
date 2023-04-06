<script setup lang="ts">
import { xIcon } from "@/assets/icons/index";
import { useModalStore } from "@/stores/modals";

const modalStore = useModalStore();
</script>

<template>
    <button @click="modalStore.closeModal()">
        <xIcon />
    </button>
</template>

<style scoped>
button {
    background-color: var(--secondaryLightColor);
    border: none;
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
    cursor: pointer;
}
</style>
