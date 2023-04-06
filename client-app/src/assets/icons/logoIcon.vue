<script setup lang="ts">
import { arrowLeftIcon, arrowRightIcon } from "@/assets/icons/index";
</script>

<template>
    <div>
        <arrowLeftIcon class="icon-left" />
        <h3>Semu</h3>
        <arrowRightIcon class="icon-right" />
    </div>
</template>

<style scoped>
div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 6rem;
    width: 8rem;
    color: var(--primaryContent);
    cursor: pointer;
    transition: 0.2s all linear;
}
div:hover {
    color: var(--primaryFeature);
    transition: 0.2s all linear;
}
h3 {
    z-index: 1;
    text-shadow: 0 0 3px #fff;
}
h3:hover {
    text-shadow: none;
}
.icon-left {
    position: absolute;
    top: 0;
    left: 0;
}
.icon-right {
    position: absolute;
    bottom: 0;
    right: 0;
}
</style>
