<script setup lang="ts">
import ModalSide from "../modals/ModalSide.vue";
import dptData from "@/assets/data/departments.json";
import Rating from "@/components/misc/Rating.vue";
import { useFiltersStore } from "@/stores/filters";
import { useModalStore } from "@/stores/modals";

const modalStore = useModalStore();

const filtersStore = useFiltersStore();

let isChecked = "false";

const departments = dptData.map((dpt) => dpt.displayName);
departments.sort((a, b) => a.localeCompare(b, "en"));

function minDateChange(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    filtersStore.minDate = Number(target.value);
}
function maxDateChange(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    filtersStore.maxDate = Number(target.value);
}
function minPriceChange(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    filtersStore.minPrice = Number(target.value);
}
function maxPriceChange(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    filtersStore.maxPrice = Number(target.value);
}

function radioInput(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    filtersStore.dep = target.value as string;
    isChecked = "true";
}
function enterKeypress(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    target.blur();
}
</script>
<template>
    <ModalSide v-if="modalStore.activeModal === 'filters'">
        <template #title> Filtres </template>
        <fieldset>
            <label for="promos">En promotion</label>
            <input id="promos" v-model="filtersStore.promosOnly" type="checkbox" name="promos" />
        </fieldset>

        <h3>Date :</h3>
        <div class="dateIn">
            <label for="minDate">min:</label>
            <input
                name="minDate"
                type="number"
                :value="filtersStore.minDate"
                :min="filtersStore.minDateDefault"
                :max="filtersStore.maxDateDefault"
                @change="minDateChange"
                @keypress.enter="enterKeypress($event)"
            />
            <label for="maxDate">max:</label>

            <input
                name="maxDate"
                type="number"
                :value="filtersStore.maxDate"
                :min="filtersStore.minDateDefault"
                :max="filtersStore.maxDateDefault"
                @change="maxDateChange"
                @keypress.enter="enterKeypress($event)"
            />
        </div>
        <h3>Prix ($) :</h3>
        <div class="dateIn">
            <label for="minPrice">min:</label>
            <input
                name="minPrice"
                type="number"
                :value="filtersStore.minPrice"
                :min="filtersStore.minPriceDefault"
                :max="filtersStore.maxPriceDefault"
                @change="minPriceChange"
                @keypress.enter="enterKeypress($event)"
            />
            <label for="maxPrice">max:</label>
            <input
                name="maxPrice"
                type="number"
                :value="filtersStore.maxPrice"
                :min="filtersStore.minPriceDefault"
                :max="filtersStore.maxPriceDefault"
                @change="maxPriceChange"
                @keypress.enter="enterKeypress($event)"
            />
        </div>
        <h3>Départements :</h3>
        <div class="dpts-group">
            <div class="dpts-bundle">
                <input
                    id="all"
                    type="radio"
                    name="dpts"
                    value=""
                    :checked="filtersStore.dep === ''"
                    @change="radioInput($event)"
                />
                <label for="all">Tous les départements</label>

                <div v-for="dpt in departments" :key="dpt" class="departments">
                    <input :id="dpt" type="radio" name="dpts" :value="dpt" @change="radioInput($event)" />
                    <label :for="dpt">{{ dpt }}</label>
                </div>
            </div>
        </div>
        <h3>Évaluation :</h3>
        <div class="rating">
            <Rating @click="Rating.heart" />
            <span>{{ filtersStore.rating }}+</span>
        </div>
        <div class="buttons">
            <button
                class="btn-primary"
                @click="
                    filtersStore.filterItems();
                    modalStore.closeModal();
                "
            >
                Appliquer
            </button>
            <button class="btn-secondary" @click="filtersStore.resetFilters('')">Réinitialiser</button>
            <button class="btn-cancel" @click="modalStore.closeModal()">Annuler</button>
        </div>
    </ModalSide>
</template>

<style scoped>
fieldset {
    border: none;
}
fieldset label {
    font-size: 1.8rem;
    font-weight: bold;
    color: var(--primaryContent);
    padding: 0 1rem 0 0;
}
h3 {
    color: var(--primaryContent);
    font-family: "Roboto Mono", monospace;
    font-weight: bold;
}
.dpts-group {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 50rem;
    overflow-y: scroll;
}
label {
    padding-left: 2rem;
}
.dpts-group label {
    cursor: pointer;
}
.dpts-bundle input {
    appearance: none;

    border-radius: 50%;
    width: 1.6rem;
    height: 1.6rem;

    border: 2px solid var(--secondaryFeature);
    transition: 0.2s all linear;
    margin-right: 5px;

    position: relative;
    top: 4px;
}
input:checked {
    border: 6px solid var(--primaryContent);
}
input:hover {
    border-color: #fff;
}
.icon {
    height: 2rem;
}
.rating {
    display: flex;
    align-content: center;
}
input[type="number"] {
    border: none;
    height: 5rem;
    width: 10rem;
    margin-left: 2rem;
    font-weight: bold;
    text-align: center;
    font-size: 2rem;
    font-family: "Roboto Mono", monospace;
    background-color: rgb(0, 0, 0, 0);
}
input[type="number"]:hover {
    border: solid #fff 2px;
    border-radius: 0.5rem;
}
.buttons {
    display: flex;
    justify-content: space-around;
}

span {
    font-family: "Roboto Mono", monospace;
    padding-left: 2rem;
    font-weight: bold;
    color: var(--primaryContent);
}
</style>
