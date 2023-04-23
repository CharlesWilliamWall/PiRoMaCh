<script setup lang="ts">
import { onMounted } from "vue";
import { useCheckoutStore } from "@/stores/checkout";
import logoIcon from "@/assets/icons/logoIcon.vue";
const checkoutStore = useCheckoutStore();

onMounted(() => {
    checkoutStore.resetToDefault();
});
</script>

<template>
    <div class="container">
        <a :href="$router.resolve({ name: 'home' }).href">
            <logoIcon />
        </a>
        <span class="title">Facturation</span>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    /* justify-content: space-around; */
    width: 100%;
    height: 100%;
    margin: 0 2rem;
}

.title {
    padding: 2rem;
    font-size: 3rem;
    font-weight: 600;
    justify-self: center;
}

.btn {
    background-color: var(--primaryFeature);
    width: fit-content;
}
a {
    text-decoration: none;
}

.error {
    color: var(--errorColor);
    font-weight: bold;
}
</style>
