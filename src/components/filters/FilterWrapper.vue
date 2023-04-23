<template>
    <div>
        <slot></slot>
    </div>
</template>

<style scoped>
div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    font-family: "Roboto Mono", monospace;
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--darkColor);
}
</style>
