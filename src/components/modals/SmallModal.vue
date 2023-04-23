<script setup lang="ts">
import FadeInOut from "@/components/transitions/FadeInOut.vue";
import { useModalStore } from "@/stores/modals";
import ModalBG from "@/components/modals/ModalBG.vue";
import CloseModalBtn from "./CloseModalBtn.vue";

const modalStore = useModalStore();
</script>

<template>
    <ModalBG />
    <main class="modal-backdrop" @click.self="modalStore.closeModal()">
        <FadeInOut>
            <div v-show="modalStore.isVisible" class="sModal container">
                <CloseModalBtn />
                <header>
                    <h2 class="modal-title">
                        <slot name="title" />
                    </h2>
                </header>
                <div class="sModal-content">
                    <slot></slot>
                </div>
            </div>
        </FadeInOut>
    </main>
</template>
<style scoped>
.modal-backdrop {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    justify-self: flex-start;

    position: fixed;
    left: 0;
    top: 0;

    height: 100vh;
    width: 100vw;
    z-index: 55;
    background-attachment: fixed;
}
.sModal {
    position: relative;
    background-color: var(--secondaryLightColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 7rem;
    gap: 1rem;
    width: 50rem;
    height: auto;
    padding: 2rem;
    z-index: 10;
}

.sModal-title {
    text-align: center;
}
.sModal-content {
    background-color: var(--secondaryLightColor);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
