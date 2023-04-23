<script setup lang="ts">
import ScaleInOut from "@/components/transitions/ScaleInOut.vue";
import FadeInOut from "@/components/transitions/FadeInOut.vue";
import ModalBG from "@/components/modals/ModalBG.vue";
import { useModalStore } from "@/stores/modals";
import CloseModalBtn from "./CloseModalBtn.vue";

const modalStore = useModalStore();
</script>

<template>
    <ModalBG />

    <main @click.self="modalStore.closeModal()">
        <FadeInOut>
            <div v-show="modalStore.isVisible" class="modal container">
                <CloseModalBtn />

                <header>
                    <h2 class="modal-title">
                        <slot name="title" />
                    </h2>
                </header>

                <div class="modal-content">
                    <slot></slot>
                </div>
            </div>
        </FadeInOut>
    </main>
</template>

<style scoped>
main {
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 100vw;
    z-index: 35;
    background-attachment: fixed;
}
.modal {
    position: relative;
    background-color: var(--secondaryLightColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 94%;
    padding: 2rem;
    margin: 0 auto;
    z-index: 55;
}
.modal-title {
    text-align: center;
    padding: 0 2rem;
}
.modal-content {
    background-color: var(--secondaryLightColor);
    display: flex;
    justify-content: space-between;
    gap: 2rem;

    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
