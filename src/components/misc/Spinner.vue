<template>
    <div class="spinner-container">
        <div class="spinner"></div>
    </div>
</template>

<style scoped>
.spinner-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}
.spinner {
    display: inline-block;
    height: 8rem;
    aspect-ratio: 1/1;
}
.spinner:after {
    content: " ";
    display: inline-block;
    height: 6.4rem;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 0.8rem solid var(--secondaryFeature);
    border-color: var(--secondaryFeature) transparent var(--secondaryFeature) transparent;
    animation: spinner 1.2s linear infinite;
}
@keyframes spinner {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
