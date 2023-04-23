<script setup lang="ts">
import type Order from "@/interfaces/Order";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const user = userStore.currentUser;
</script>
<template>
    <div class="invoice">
        <Order v-for="order in currentUser.orders" :key="order.id" :order="order" />
    </div>
</template>

<style scoped></style>
