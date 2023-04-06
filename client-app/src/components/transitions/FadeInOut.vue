<script setup lang="ts"></script>

<template>
    <Transition appear name="fade" mode="out-in">
        <slot></slot>
    </Transition>
</template>

<style scoped>
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease-in-out;
}
</style>
