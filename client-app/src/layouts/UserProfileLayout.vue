<script setup lang="ts">
import Head from "@/components/header/HeadUser.vue";
</script>

<template>
    <Head />
    <div class="container">
        <aside>
            <slot name="aside"></slot>
        </aside>

        <main>
            <slot></slot>
        </main>
    </div>
</template>

<style scoped>
.container {
    display: grid;
    grid-template-rows: 6rem 1fr;
    grid-template-columns: 30rem 1fr;
    row-gap: 1rem;
    grid-template-areas:
        "header header"
        "aside main";
    height: 100vh;
}
header {
    grid-area: header;
}
aside {
    grid-area: aside;
}
main {
    grid-area: main;
    overflow: auto;
}
</style>
