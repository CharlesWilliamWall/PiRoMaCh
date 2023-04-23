<script setup lang="ts"></script>

<template>
    <TransitionGroup appear name="push-out">
        <slot></slot>
    </TransitionGroup>
</template>

<style>
.push-out-leave-to {
    opacity: 0;
    transform: translate(0, -175px);
}
.push-out-leave-from {
    opacity: 1;
}
.push-out-leave-active,
.push-out-move {
    transition: all 0.5s ease;
}
.push-out-leave-active {
    position: absolute;
}
</style>
