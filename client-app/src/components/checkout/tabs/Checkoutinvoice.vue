<script setup lang="ts">
import Invoice from "@/components/checkout/Invoice.vue";
import router from "@/router";
</script>

<template>
    <div>
        <h1 class="title">Détails de la commande</h1>
        <Invoice />
        <button class="btn-primary" @click="router.push('/home')">Retour</button>
    </div>
</template>
<style scoped>
.title h1 {
    font-size: 2.5rem;
    margin: 0.5rem;
    width: 25vw;
}
div {
    display: flex;
    flex-direction: column;
}
</style>
