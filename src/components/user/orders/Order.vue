<script setup lang="ts">
import { ref, onMounted } from "vue";
import type Order from "@/interfaces/Order";
import { useOrderStore } from "@/stores/order";
import { useUserStore } from "@/stores/user";
import truncateString from "@/utils/truncate";

const orderStore = useOrderStore();
const userStore = useUserStore();

onMounted(async () => {
    await orderStore.getOrders();
});
</script>

<template>
    <div class="container">
        <h1 class="title">Vos commandes</h1>
        <div v-for="order in orderStore.orders" :key="order.id.toString" class="order">
            <div class="order">
                <div class="orderHeader">
                    <h3 class="title">Commande #SEMU{{ ("00000" + order.id.toString()).slice(-5) }}</h3>
                    <p class="orderDate">Passée le {{ new Date(order.date).toLocaleDateString() }}</p>
                </div>
                <table class="table">
                    <thead class="tableHeader">
                        <tr>
                            <th class="itemNumber">Id</th>
                            <th class="itemTitle">Oeuvre(s)</th>
                            <th class="itemNumber">Prix un.</th>
                            <th class="itemNumber">Qté</th>
                            <th class="itemNumber">Sous-total</th>
                        </tr>
                    </thead>
                    <tbody class="tableBody">
                        <tr v-for="item in order.items" :key="item.title">
                            <td class="itemNumber">{{ item.objectID }}</td>
                            <td class="itemTitle">{{ truncateString(item.title, 30) }}</td>
                            <td class="itemNumber">{{ item.price.toFixed(2) }} $</td>
                            <td class="itemNumber">{{ item.quantity }}</td>
                            <td class="itemNumber">{{ item.subtotal.toFixed(2) }} $</td>
                        </tr>
                    </tbody>
                </table>
                <p class="total">
                    Total de la facture: <span class="bold"> {{ order.total.toFixed(2) }}$</span>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: auto;
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
    margin-bottom: 5rem;
}
.orderHeader {
    display: flex;
}
.title {
    padding: 1rem;
    text-align: center;
}
.orderDate {
    padding: 1rem;
    margin-left: auto;
    font-size: 1.5rem;
}

.table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    margin-bottom: 2rem;
}

th {
    margin: 2rem;
    background-color: var(--primaryLightColor);
    font-weight: bold;
    font-size: 1.6rem;
    text-align: left;
    padding: 0.5rem;
}
.tableHeader {
    border-radius: var(--radius);
}
.tableBody {
    padding: 2rem;
}
.itemNumber {
    width: 5rem;
    padding: 0.5rem;
    text-justify: center;
    text-align: center;
}
.itemTitle {
    width: 20rem;
    padding-left: 1rem;
}
.total {
    text-align: center;
    padding: 2rem 0;
    background-color: var(--ternaryAccentColor);
    border-radius: var(--radius);
    width: 30rem;
    margin-left: auto;
    margin-bottom: 7rem;
}
.bold {
    font-weight: bold;
}
</style>
