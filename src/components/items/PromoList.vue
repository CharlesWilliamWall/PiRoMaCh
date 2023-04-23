<script setup lang="ts">
import { onMounted, computed, reactive } from "vue";
import { useItemsStore } from "@/stores/items";
import truncateString from "@/utils/truncate";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Navigation } from "vue3-carousel";
import Timer from "@/components/Timer.vue";
import PromoTag from "../PromoTag.vue";
import { usePromosStore } from "@/stores/promos";
import { shoppingBagIcon, heartIcon } from "@/assets/icons/index";
import { useCartStore } from "@/stores/cart";
import { toCAD } from "@/utils/toCurrency";
import { useModalStore } from "@/stores/modals";
import router from "@/router";

const itemsStore = useItemsStore();
const promosStore = usePromosStore();
const cartStore = useCartStore();
const modalStore = useModalStore();

const settings = {
    itemsToShow: 5,
    itemsToScroll: 5,
    wrapAround: true,
    autoplay: false,
    transition: 400,
};

function openModal() {
    const modal = document.querySelector(".modal");
    modal?.classList.add("open");
    setTimeout(() => {
        modal?.classList.remove("open");
    }, 2000);
}

const onClick = async (objectID: any) => {
    await itemsStore.fetchItemFromDB(objectID);
    router.push(`/item/${objectID}`);
};

onMounted(async () => {
    await itemsStore.fetchPromoItemsFromDB();
    await promosStore.fetchPromosFromDB();
});

if (promosStore.isPromoOver) {
    promosStore.fetchPromosFromDB();
}
</script>

<template>
    <main>
        <Timer class="mainTimer" />
        <div v-if="promosStore.currentPromos.length" class="items-list">
            <Carousel :settings="settings">
                <Slide v-for="item in itemsStore.currentPromoItems" :key="item.objectID">
                    <div class="card">
                        <p v-if="cartStore.showAddedToCart === item.objectID" class="buy-confirm">Ajouté au panier !</p>
                        <div class="card-title">
                            <h3>{{ truncateString(item.title, 20) }}</h3>
                        </div>
                        <div class="card-image" @click="onClick(item.objectID)">
                            <img :src="item.primaryImageSmall" alt="item image" />
                        </div>
                        <div class="card-pricing">
                            <div class="original-price">
                                <div class="regular-price">
                                    <p>{{ toCAD(item.price) }}</p>
                                </div>
                                <div class="discount">
                                    <PromoTag>
                                        <p>-{{ promosStore.getDiscount(item) }}%</p>
                                    </PromoTag>
                                </div>
                            </div>
                            <div class="card-off">
                                <div>
                                    <p>{{ toCAD(promosStore.getDiscountedPrice(item)) }}</p>
                                </div>
                            </div>
                            <div class="card-end">
                                <div class="bag" @click="openModal">
                                    <shoppingBagIcon class="shoppingBagIcon" @click.stop="cartStore.addToCart(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Slide>
                <template #addons>
                    <Navigation />
                </template>
            </Carousel>
        </div>
    </main>
</template>

<style scoped>
main {
    width: 100%;
    height: 40vh;
    overflow: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 3rem;
    padding-right: 3rem;
    margin-top: 1rem;
    border: 1px solid #fff;
    border-radius: 0.5rem;
}
.mainTimer {
    padding: 0 3rem 0 3rem;
    margin-bottom: 1rem;
    height: 3rem;
}

.card {
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgb(209, 209, 209);
    padding: 1rem;
    border-radius: 1rem;
    width: 95%;
}

.card-title {
    font-size: 1rem;
}

img {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 0.25rem;
    cursor: pointer;
}

.card-pricing {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    margin-top: 0.5rem;
}

.original-price {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-bottom: 1rem;
    margin-top: 2rem;
}

.regular-price {
    position: absolute;
    text-decoration: line-through rgba(11, 12, 15, 0.642);
}

.discount {
    position: absolute;
    left: 60%;
    top: 60%;
}

.card-off {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    margin: 0.5rem;
}
.card-off p {
    font-weight: bold;
}
.card-end {
    display: flex;
    width: 100%;
    justify-content: space-around;
    align-items: center;
}
.shoppingBagIcon {
    height: 3.25rem;
}

.bag {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 1rem;
}
.buy-confirm {
    position: absolute;
    padding: 0.5rem;
    display: flex;
    top: 25%;
    font-size: 1.8rem;
    color: var(--primaryLightColor);
    font-weight: bold;
    text-shadow: 0px 0px 3px #000;
    background-color: #0003;
    backdrop-filter: blur(10px);
    z-index: 10;
}
</style>
