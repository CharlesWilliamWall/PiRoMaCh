<script setup lang="ts">
import FadeInOut from "@/components/transitions/FadeInOut.vue";
import { useModalStore } from "@/stores/modals";

const modalStore = useModalStore();
</script>

<template>
    <FadeInOut>
        <div v-show="modalStore.isVisible" class="modal-backdrop"></div>
    </FadeInOut>
</template>

<style scoped>
.modal-backdrop {
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 30;
    background-color: var(--modalBackdrop);
    background-attachment: fixed;
}
</style>
