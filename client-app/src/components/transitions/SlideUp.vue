<script setup lang="ts"></script>

<template>
    <TransitionGroup appear name="slide-up">
        <slot></slot>
    </TransitionGroup>
</template>

<style>
.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
    transform: scale(0.5);
}
.slide-up-enter-to,
.slide-up-leave-from {
    opacity: 1;
}
.slide-up-enter-active,
.slide-up-leave-active,
.slide-up-move {
    transition: all 0.5s ease;
}
.slide-up-leave-active {
    position: absolute;
}
</style>
