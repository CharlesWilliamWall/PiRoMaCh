<script setup lang="ts">
import truncateString from "@/utils/truncate";
import PushOut from "@/components/transitions/PushOut.vue";
import { xIcon } from "@/assets/icons/index";
import { useCartStore } from "@/stores/cart";
import { usePromosStore } from "@/stores/promos";
import { toCAD } from "@/utils/toCurrency";
import PromoTag from "../PromoTag.vue";

const cartStore = useCartStore();
const promosStore = usePromosStore();
</script>

<template>
    <section class="cart-container">
        <PushOut>
            <div v-for="item in cartStore.cartItems" :key="item.objectID" class="cart-item">
                <img :src="item.primaryImageSmall" :alt="item.title" />

                <h4 class="title">{{ truncateString(item.title, 100) }}</h4>

                <p class="artist">{{ truncateString(item.artistDisplayName, 50) }}</p>

                <input v-model="item.quantity" type="number" min="1" required class="qty" />

                <div class="price">
                    <p v-if="promosStore.isPromo(item)" class="final-price">
                        {{ toCAD(promosStore.getDiscountedPrice(item)) }}
                    </p>
                    <p v-else class="final-price">{{ toCAD(item.price) }}</p>

                    <div v-if="promosStore.isPromo(item)" class="regular-price">
                        {{ toCAD(item.price) }}

                        <PromoTag class="discount">
                            <span>-{{ promosStore.getDiscount(item) }}%</span>
                        </PromoTag>
                    </div>
                </div>

                <div v-if="(item.quantity as number > 1)" class="sub-total">
                    <p>Sous-total ({{ item.quantity }} copies)</p>

                    <p v-if="promosStore.isPromo(item)" class="final-price">
                        {{ toCAD(promosStore.getDiscountedPrice(item) * (item.quantity as number)) }}
                    </p>
                    <p v-else class="final-price">{{ toCAD(item.price * (item.quantity as number)) }}</p>
                </div>

                <button class="remove-from-cart-btn" @click="cartStore.removeFromCart(item)">
                    <xIcon />
                </button>
            </div>
        </PushOut>
    </section>
</template>

<style scoped>
.cart-container {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: start;
    gap: 1rem;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}
.cart-item {
    display: grid;
    grid-template-columns: 18.7rem 3fr 6rem 16rem 5rem;
    grid-template-rows: 2fr 1fr;
    grid-template-areas:
        "img title qty price remove-btn"
        "img artist sub-total sub-total remove-btn";
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 18.7rem;
    width: 100%;
    border-bottom: solid var(--secondaryFeature) 0.2rem;
}
img {
    grid-area: img;

    object-fit: cover;
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 5px 5px 0 0;
    box-shadow: 1px -1px 5px var(--itemBackdrop);
}
.title {
    grid-area: title;

    font-weight: bold;
    line-height: 1.4;
}
.artist {
    grid-area: artist;
    line-height: 1.4;
}
.qty {
    grid-area: qty;
    width: 6rem;
    padding: 1rem 0 1rem 1rem;
    text-align: center;
    background-color: inherit;
    border: solid var(--secondaryFeature) 2px;
    border-radius: 5px;

    font-weight: 700;
    font-size: 1.6rem;
}
.price {
    grid-area: price;

    display: grid;
    grid-template-areas:
        "regular-price"
        "final-price";
    justify-items: end;
    align-items: center;
    gap: 5px;

    height: 100%;
    width: 100%;
    padding-right: 2rem;
}
.discount {
    grid-area: discount;

    position: absolute;
    top: -2.9rem;
    right: -2rem;

    height: 40px;
    width: 60px;
}
.regular-price {
    grid-area: regular-price;

    text-decoration: line-through;

    position: relative;
    align-self: end;
}
.final-price {
    grid-area: final-price;

    font-size: 1.7rem;
    font-weight: 700;
}
.sub-total {
    grid-area: sub-total;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: end;

    height: 100%;
    padding-right: 2rem;

    font-weight: 700;
    font-size: 1.5rem;
}
.remove-from-cart-btn {
    grid-area: remove-btn;

    background-color: var(--secondaryLightColor);
    border: none;
    cursor: pointer;

    color: var(--primaryLightColor);
}
</style>
