<script setup lang="ts">
import { ref, computed } from "vue";
import { arrowLeftIcon, arrowRightIcon } from "@/assets/icons/index";
const props = defineProps<{ title: string; bottom: number; top: number; min: number; max: number }>();
const emit = defineEmits<{
    (event: "minChange", min: number): void;
    (event: "maxChange", max: number): void;
}>();

function minChange(min: number) {
    emit("minChange", min);
}

function maxChange(max: number) {
    emit("maxChange", max);
}

const min = ref(props.min);
const max = ref(props.max);

const sliderMin = computed({
    get() {
        let value = min.value.toString();
        return value;
    },
    set(newMin) {
        let newVal = parseInt(newMin);
        if (newVal > max.value) {
            max.value = newVal;
        }
        min.value = newVal;
    },
});

const sliderMax = computed({
    get() {
        let value = max.value.toString();
        return value;
    },
    set(newMax) {
        let newVal = parseInt(newMax);
        if (newVal < min.value) {
            min.value = newVal;
        }
        max.value = newVal;
    },
});
</script>
<template>
    <div class="range-slider">
        <h3>{{ title }}:</h3>
        <arrowRightIcon />
        <input
            v-model="sliderMin"
            type="number"
            :min="bottom"
            :max="top"
            step="1"
            @change="minChange(Number($event.target.value))"
        />
        <input
            v-model="sliderMax"
            type="number"
            :min="bottom"
            :max="top"
            step="1"
            @change="maxChange(Number($event.target.value))"
        />
        <arrowLeftIcon />
        <input
            v-model="sliderMin"
            class="minRange"
            type="range"
            :min="bottom"
            :max="top"
            step="1"
            @input="minChange(Number($event.target.value))"
        />
        <input
            v-model="sliderMax"
            class="maxRange"
            type="range"
            :min="bottom"
            :max="top"
            step="1"
            @input="maxChange(Number($event.target.value))"
        />
    </div>
</template>
<style scoped>
.range-slider {
    width: 100%;
    margin: auto;
    display: flex;

    justify-content: space-around;
    position: relative;
    height: 6rem;
    color: var(--primaryContent);
}
h3 {
    font-weight: bold;
}
.icon {
    height: 3rem;
}

input[type="number"] {
    border: none;
    text-align: center;
    font-size: 1.2em;
    height: 3rem;
    background-color: rgba(0, 0, 0, 0);
    font-family: "Roboto Mono", monospace;
    color: var(--primaryContent);
    margin-bottom: 1rem;
}

input[type="number"]:invalid,
input[type="number"]:out-of-range {
    border: 2px solid var(--errorColor);
}
input[type="number"]:hover {
    color: #fff;
    transition: 0.2s all linear;
}

.range-slider input[type="range"] {
    position: absolute;
    left: 0;
    bottom: 0;
}
input[type="range"] {
    width: 100%;
}

input[type="range"]:focus {
    background: var(--secondaryAccentColor);
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 5px;
    cursor: pointer;
    background: var(--primaryLightColor);
    border-radius: 1px;
    box-shadow: none;
    border: 0;
}

input[type="range"]::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    box-shadow: 0px 0px 0px #000;
    border: 1px solid var(--secondaryAccentColor);
    height: 18px;
    width: 18px;
    border-radius: 25px;
    background: var(--darkColor);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -7px;
}
</style>
