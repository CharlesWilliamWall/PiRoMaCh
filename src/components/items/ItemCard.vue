<script setup lang="ts">
import { ref } from "vue";
import type { Item } from "@/interfaces/Item";
import { shoppingBagIcon, heartIcon } from "@/assets/icons/index";
import truncateString from "@/utils/truncate";
import { useItemsStore } from "@/stores/items";
import { useCartStore } from "@/stores/cart";
import { useModalStore } from "@/stores/modals";
import { usePromosStore } from "@/stores/promos";
import { toCAD } from "@/utils/toCurrency";
import PromoTag from "../PromoTag.vue";
import router from "@/router";

const itemsStore = useItemsStore();
const cartStore = useCartStore();
const modalStore = useModalStore();
const promoStore = usePromosStore();

const props = defineProps<{ item: Item }>();

const isPromo = promoStore.isPromo(props.item);

const showTitle = ref(false);

const onClick = async (objectID: any) => {
    await itemsStore.fetchItemFromDB(objectID);
    router.push(`/item/${objectID}`);
};
</script>

<template>
    <div class="item" @mouseover="showTitle = true" @mouseleave="showTitle = false" @click="onClick(item.objectID)">
        <img class="img" :src="item.primaryImageSmall" :alt="item.title" />
        <div v-if="showTitle" class="card">
            <p>{{ truncateString(item.title, 50) }}</p>
            <p :class="{ regularPrice: isPromo }">{{ toCAD(item.price) }}</p>
            <p v-if="isPromo" class="final-price">
                {{ toCAD(promoStore.getDiscountedPrice(item)) }}
            </p>
            <div v-if="isPromo" class="promo">
                <PromoTag class="discount">
                    <span>-{{ promoStore.getDiscount(item) }}%</span>
                </PromoTag>
            </div>
            <div class="icons">
                <div class="displayIcons">
                    <p>{{ item.rating }} <br /><heartIcon class="heartIcon" /></p>

                    <shoppingBagIcon class="shoppingBagIcon" @click.stop="cartStore.addToCart(item)" />
                </div>
            </div>
        </div>
        <p v-if="cartStore.showAddedToCart === item.objectID" class="buy-confirm">Ajouté au panier !</p>
    </div>
</template>

<style scoped>
.item {
    width: 100%;
    height: 25vh;
    position: relative;
    box-shadow: 0 0 3px var(--itemBackdrop);
    transition: 0.2s all linear;
}
.buy-confirm {
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    color: var(--primaryLightColor);
    font-weight: bold;
    text-align: center;
    text-shadow: 0px 0px 3px #000;
}
.item img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    transition: 0.2s all linear;
}

.item:hover .img {
    border: solid rgba(0, 0, 0, 0) 1rem;
    transition: 0.2s all linear;
}

.item:hover .card {
    border: solid rgba(255, 255, 255, 50) 0.3rem;
    border-radius: var(--radius);
    transition: 0.2s all linear;
}
.card {
    position: absolute;
    background-color: var(--itemBackdrop);
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.card p {
    color: #fff;
    font-size: 1rem;
    text-align: center;
    backdrop-filter: blur(5px);
}
.regularPrice {
    text-decoration: line-through;
}
.final-price {
    font-size: 1.7rem;
    font-weight: bold;
}
.discount {
    border-radius: 0;
}

.open {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    height: 100%;
}

.icons {
    width: 100%;
    display: flex;
}

.displayIcons {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    align-self: flex-end;
    height: 100%;
    padding: 0.5rem;
    backdrop-filter: blur(5px);
}
.displayIcons p {
    color: var(--primaryLightColor);
    font-weight: bold;
}
.heartIcon {
    height: 3rem;
    cursor: pointer;
    transition: 0.2s all linear;
}
.heartIcon:hover {
    fill: var(--accentColor);
    transition: 0.2s all linear;
}

.shoppingBagIcon {
    color: var(--primaryLightColor);
    height: 3rem;
    /* cursor: pointer; */
    text-shadow: none;
}
.shoppingBagIcon:hover {
    color: var(--primaryFeature);
    text-shadow: 0 0 3px #fff;
}
</style>
