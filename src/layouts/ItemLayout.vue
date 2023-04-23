<script lang="ts" setup>
import FadeInOut from "@/components/transitions/FadeInOut.vue";
import ModalBG from "@/components/modals/ModalBG.vue";
import HeadItemInfo from "@/components/header/HeadItemInfo.vue";
</script>
<template>
    <HeadItemInfo />
    <main>
        <FadeInOut>
            <div class="modal container">
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
    flex-direction: column;
    position: fixed;
    height: 95vh;
    width: 100%;
    background-attachment: fixed;
    background: linear-gradient(to bottom left, var(--primaryContent), var(--primaryLightColor)) no-repeat;
}
.modal {
    position: relative;
    background-color: rgba(0, 0, 0, 0);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 80%;
    width: 70%;
    padding: 2rem;
    margin: 0 auto;
}
.modal-title {
    text-align: center;
    padding: 0 2rem;
}
.modal-content {
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    height: 100%;
    width: 100%;
    overflow: auto;
}
</style>
