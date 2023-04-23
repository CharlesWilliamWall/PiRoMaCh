<script setup lang="ts"></script>

<template>
    <Transition appear name="scale" mode="out-in">
        <slot></slot>
    </Transition>
</template>

<style scoped>
.scale-enter-from,
.scale-leave-to {
    transform: scale(0);
}
.scale-enter-to,
.scale-leave-from {
    transform: scale(1);
}
.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s ease;
}
</style>
