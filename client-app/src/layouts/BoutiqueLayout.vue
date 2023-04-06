<script setup lang="ts"></script>

<template>
    <div class="container">
        <main>
            <slot></slot>
        </main>
        <footer>
            <slot name="pagination"></slot>
        </footer>
    </div>

    <aside>
        <slot name="filters"></slot>
    </aside>
</template>

<style scoped>
.container {
    height: 100vh;
}
main {
    overflow: auto;
}
</style>
