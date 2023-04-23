<script setup lang="ts"></script>

<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    background-color: var(--promoTagColor);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 5px;
    border-radius: 0.5rem;
    font-weight: bold;
    box-shadow: 0 0 3px var(--itemBackdrop);
}
</style>
