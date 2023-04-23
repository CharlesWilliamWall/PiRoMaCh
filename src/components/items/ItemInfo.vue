<script setup lang="ts">
import { heartIcon, arrowRightIcon, shoppingBagIcon, shareIcon } from "@/assets/icons/index";
import truncateString from "@/utils/truncate";
import { useItemsStore } from "@/stores/items";
import { useCartStore } from "@/stores/cart";
import { usePromosStore } from "@/stores/promos";
import { toCAD } from "@/utils/toCurrency";
import Timer from "@/components/Timer.vue";
import PromoTag from "@/components/PromoTag.vue";
import ItemLayout from "@/layouts/ItemLayout.vue";
import NotFound404 from "../NotFound404.vue";

const cartStore = useCartStore();
const itemsStore = useItemsStore();
const promoStore = usePromosStore();

let isPromo = false;

if (itemsStore.currentItem) {
    isPromo = promoStore.isPromo(itemsStore.currentItem);
}

let item = itemsStore.currentItem;
let itemTitle = itemsStore.currentItem.title;

const emptyProperty = (property: string) => {
    if (property === "") {
        return "N/A";
    } else {
        return property;
    }
};

function filterTags(tags: string[]) {
    let str = "";

    for (let i = 0; i < tags.length; i++) {
        str += tags[i];
        if (i < tags.length - 1) {
            str += ", ";
        } else {
            str += ".";
        }
    }
    return str;
}
const share = () => {
    if (navigator.share) {
        navigator
            .share({
                title: "Oeuvre d'art",
                text: "Regarde cette oeuvre d'art !",
                url: window.location.href,
            })
            .then(() => console.log("Successful share"))
            .catch((error) => console.log("Error sharing", error));
    } else {
        console.log("Share not supported");
    }
};
</script>

<template>
    <ItemLayout v-if="item">
        <div class="content">
            <div class="leftSide">
                <div class="primaryImage">
                    <a :href="item.primaryImage" target="_blank" rel="noopener noreferrer">
                        <img :src="item.primaryImageSmall" :alt="item.objectName" />
                    </a>
                    <p v-if="cartStore.showAddedToCart === item.objectID" class="buy-confirm">Ajouté au panier !</p>
                </div>
                <div class="linkShare">
                    <div class="first-btn-row">
                        <div class="rating">
                            <span>{{ item.rating }}</span>
                            <span><heartIcon class="heartIcon" /></span>
                        </div>
                        <a :href="item.objectURL" target="_blank" rel="noopener noreferrer">
                            <button class="btn-secondary toMet">
                                <span>MET</span>
                                <span><arrowRightIcon /></span>
                            </button>
                        </a>
                        <button class="btn-secondary share" @click="share">
                            <shareIcon class="shareIcon" />
                        </button>
                    </div>

                    <button class="btn-primary addToCartBtn" @click.stop="cartStore.addToCart(item)">
                        <span>Ajouter au panier </span>
                    </button>
                </div>
                <div class="secondImgContainer">
                    <img
                        v-for="additionalImages in item.additionalImages.slice(0, 5)"
                        :key="additionalImages"
                        :src="additionalImages"
                        :alt="item.objectName"
                        :href="item.additionalImages"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="secondaryImages"
                    />
                </div>
            </div>
            <div class="rightSide">
                <ul class="description">
                    <li>
                        <span class="propertyTitle">Type d'œuvre: </span>
                        <span class="text">{{ emptyProperty(item.objectName) }}</span>
                    </li>
                    <li>
                        <span class="propertyTitle">Artiste: </span>
                        <span> {{ emptyProperty(item.artistDisplayName) }}</span>
                    </li>
                    <li><span class="propertyTitle">Artiste bio: </span> {{ emptyProperty(item.artistDisplayBio) }}</li>
                    <li><span class="propertyTitle">Culture: </span> {{ emptyProperty(item.culture) }}</li>
                    <li><span class="propertyTitle">Période: </span> {{ emptyProperty(item.period) }}</li>
                    <li><span class="propertyTitle">Date de création: </span> {{ emptyProperty(item.objectDate) }}</li>
                    <li>
                        <span class="propertyTitle">Dimensions: </span>
                        <span>{{ truncateString(item.dimensions, 150) }}</span>
                    </li>
                    <li><span class="propertyTitle">Medium: </span> {{ emptyProperty(item.medium) }}</li>
                    <li>
                        <span class="propertyTitle">Classification: </span> {{ emptyProperty(item.classification) }}
                    </li>
                    <li><span class="propertyTitle">Département: </span>{{ emptyProperty(item.department) }}</li>
                    <li><span class="propertyTitle">Tags: </span>{{ filterTags(item.tags) }}</li>

                    <li class="priceSection">
                        <span class="propertyTitle">Prix: </span>
                        <span :class="{ regularPrice: isPromo }">{{ toCAD(item.price) }}</span>
                        <PromoTag v-if="isPromo" class="discount">
                            <span>-{{ promoStore.getDiscount(item) }}%</span>
                        </PromoTag>
                        <span v-if="isPromo" class="final-price">
                            {{ toCAD(item.price - (item.price * Number(promoStore.getDiscount(item))) / 100) }}
                        </span>
                    </li>
                    <Timer v-if="isPromo" />
                </ul>
            </div>
        </div>
    </ItemLayout>
    <NotFound404 v-else />
</template>

<style scoped>
.content {
    display: flex;
    margin-top: 2rem;
    gap: 4rem;
    width: 100%;
}
.leftSide {
    display: grid;
    grid-template-columns: repeat(2, 1fr) 0.5fr;
    grid-template-rows: repeat(2, 1fr) 0.5fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    width: 50%;
}
.primaryImage {
    grid-area: 1 / 1 / 3 / 3;
    border: none;
    border-color: rgba(0, 0, 0, 0);
    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.2s ease-in-out;
}
.buy-confirm {
    display: flex;
    position: absolute;
    top: 40%;
    width: 50%;
    z-index: 1;
    height: 8rem;
    backdrop-filter: blur(10px);
    justify-content: flex-start;
    padding-left: 8%;
    align-items: center;
    font-weight: bold;
    font-size: 2.5rem;
    color: #fff;
    text-shadow: 0px 0px 3px #000;
}
.primaryImage img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
.linkShare {
    display: flex;
    justify-content: start;
    flex-direction: column;
    gap: 1rem;
    grid-area: 3 / 1 / 4 / 3;
}
.rating {
    display: flex;
    flex-direction: column;
}
.first-btn-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 1rem;
}
.addToCartBtn {
    width: 100%;
    margin: 0;
}
.secondImgContainer {
    grid-area: 1 / 3 / 3 / 4;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

.secondaryImages {
    border: solid 2px transparent;
    border-color: rgba(0, 0, 0, 0);
    border-radius: 0.5rem;
    width: 9.5rem;
    height: 8rem;
    object-fit: contain;
    transition: all 0.2s ease-in-out;
}

.secondaryImages:hover {
    border: solid 2px #fff;
    transition: all 0.2s ease-in-out;
}

.rightSide {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding-right: 0.5rem;
    overflow-y: auto;
}
.description {
    list-style: disc inside;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.7rem;
}
.priceSection {
    display: flex;
    margin-top: 2rem;
}
.propertyTitle {
    font-family: "Roboto Mono", monospace;
    font-style: italic;
    font-weight: bold;
    font-size: 1.6rem;
    padding-right: 1rem;
}

.regularPrice {
    text-decoration: line-through;
}
.discount {
    position: relative;
    top: -2.1rem;
    left: -2rem;

    height: 40px;
    width: 60px;
    box-shadow: 0 0 3px var(--itemBackdrop);
}
.final-price {
    font-size: 1.7rem;
    font-weight: bold;
    margin-left: 1.5rem;
}

.regPrice {
    font-size: 2rem;
    font-weight: 600;
    font-weight: bold;
    color: var(--secondaryDarkFeature);
    margin-top: 2rem;
}
.priceWord {
    color: var(--darkColor);
    font-weight: bold;
}
div p {
    text-align: center;
}
.icon {
    margin: 0 auto;
    height: 3rem;
}

.heartIcon {
    color: #fff;
    fill: var(--accentColor);
}
.share,
.toMet {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 8rem;
}
a {
    text-decoration: none;
}

.copied {
    color: var(--primaryContent);
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 1rem;
    text-align: center;
}

p {
    color: var(--darkColor);
    font-weight: bold;
    font-size: 1.5rem;
    margin-top: 1rem;
    text-align: center;
}
</style>
