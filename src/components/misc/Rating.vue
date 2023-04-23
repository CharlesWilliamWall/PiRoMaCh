<script setup lang="ts">
import { ref } from "vue";
import { heartIcon } from "@/assets/icons/index";
import { useFiltersStore } from "@/stores/filters";

const filtersStore = useFiltersStore();

const rating = ref(0);
const hearts = [1, 2, 3, 4];

function ratingChanged(heart: number) {
    rating.value = heart;
    filtersStore.rating = heart;
}
</script>

<template>
    <main>
        <div class="rating">
            <ul class="list">
                <li
                    v-for="heart in hearts"
                    :key="heart"
                    class="heart-icon"
                    :class="{ active: heart <= filtersStore.rating }"
                    @click="ratingChanged(heart)"
                >
                    <heartIcon class="heart" />
                </li>
            </ul>
        </div>
    </main>
</template>

<style scoped lang="scss">
$active-color: var(--accentColor);

.rating {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    font-size: 22px;
    color: var(--secondaryFeature);
}
.list {
    margin: 0 0 5px 0;
    padding: 0;
    list-style-type: none;
    &:hover {
        .heart-icon {
            color: $active-color;
        }
    }
}
.heart {
    height: 3rem;
}

.heart-icon {
    display: inline-block;
    cursor: pointer;
    &:hover {
        & ~ .heart-icon {
            &:not(.active) {
                color: inherit;
            }
        }
    }
}
.active {
    color: $active-color;
}
</style>
