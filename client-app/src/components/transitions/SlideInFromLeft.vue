<script setup lang="ts"></script>

<template>
    <TransitionGroup appear name="slide-in-from-left" mode="out-in">
        <slot></slot>
    </TransitionGroup>
</template>

<style>
.slide-in-from-left-enter-from,
.slide-in-from-left-leave-to {
    transform: translate(-50rem, 0);
}
.slide-in-from-left-enter-to,
.slide-in-from-left-leave-from {
    transform: translate(0, 0);
}
.slide-in-from-left-enter-active,
.slide-in-from-left-leave-active,
.slide-in-from-left-move {
    transition: all 0.3s ease;
}
</style>
