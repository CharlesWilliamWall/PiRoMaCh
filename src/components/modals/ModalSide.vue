<script setup lang="ts">
import { xIcon } from "@/assets/icons/index";
import SlideInFromLeft from "@/components/transitions/SlideInFromLeft.vue";
import ModalBG from "@/components/modals/ModalBG.vue";
import { useModalStore } from "@/stores/modals";
import CloseModalBtn from "./CloseModalBtn.vue";

const modalStore = useModalStore();
</script>

<template>
    <ModalBG />
    <main class="lateral-backdrop" @click.self="modalStore.closeModal()">
        <SlideInFromLeft>
            <div v-show="modalStore.isVisible" class="lateral container">
                <CloseModalBtn />
                <header>
                    <h2 class="lateral-title">
                        <slot name="title" />
                    </h2>
                </header>
                <div class="lateral-content">
                    <slot></slot>
                </div>
            </div>
        </SlideInFromLeft>
    </main>
</template>

<style scoped>
.lateral-backdrop {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    justify-self: flex-start;

    position: fixed;
    left: 0;
    top: 0;

    height: 100vh;
    width: 100vw;
    z-index: 55;
    background-attachment: fixed;
}
.lateral {
    position: relative;
    background-color: var(--secondaryLightColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    gap: 1rem;
    width: 50rem;
    height: 100vh;
    padding: 2rem;
    z-index: 10;
}
h2 {
    margin-bottom: 2rem;
}
.close {
    background-color: var(--secondaryLightColor);
    border: none;
    position: absolute;
    margin: 0;
    top: 0;
    right: 0;
    cursor: pointer;
}
.icon {
    height: 4rem;
}
.xIcon {
    color: var(--darkColor);
    size: 3rem;
    width: 100%;
}
.xIcon:hover {
    color: var(--accentColor);
    transition: 0.2s all linear;
}
.lateral-title {
    text-align: center;
}
.lateral-content {
    background-color: var(--secondaryLightColor);
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;

    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
