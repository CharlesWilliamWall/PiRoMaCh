import { defineStore } from "pinia";
import { useItemsStore } from "@/stores/items";
import { usePaginationStore } from "./pagination";

const defaultState = {
    search: "",
    sort: "-rating",
    minPrice: 100,
    maxPrice: 10000,
    rating: 1,
    dep: "",
    minDate: -550,
    maxDate: 2023,
    promosOnly: false,
};

interface Filters {
    search: string;
    sort: string;
    minPrice: number;
    maxPrice: number;
    rating: number;
    dep: string;
    minDate: number;
    maxDate: number;
    promosOnly: boolean;
}
export const useFiltersStore = defineStore("filters", {
    state: (): Filters => {
        return {
            search: defaultState.search,
            sort: defaultState.sort,
            minPrice: defaultState.minPrice,
            maxPrice: defaultState.maxPrice,
            rating: defaultState.rating,
            dep: defaultState.dep,
            minDate: defaultState.minDate,
            maxDate: defaultState.maxDate,
            promosOnly: defaultState.promosOnly,
        };
    },
    getters: {
        minDateDefault(): number {
            return defaultState.minDate;
        },
        maxDateDefault(): number {
            return defaultState.maxDate;
        },
        minPriceDefault(): number {
            return defaultState.minPrice;
        },
        maxPriceDefault(): number {
            return defaultState.maxPrice;
        },
    },
    actions: {
        async filterItems() {
            const paginationStore = usePaginationStore();
            paginationStore.setPage(1);
        },
        resetFilters(option: string) {
            this.minPrice = defaultState.minPrice;
            this.maxPrice = defaultState.maxPrice;
            this.rating = defaultState.rating;
            this.dep = defaultState.dep;
            this.minDate = defaultState.minDate;
            this.maxDate = defaultState.maxDate;
            if (option !== "keepsearch") this.promosOnly = defaultState.promosOnly;
        },
        async searchDB() {
            this.resetFilters("keepsearch");
            const paginationStore = usePaginationStore();
            paginationStore.setPage(1);
        },
        async updateSortAndGetItems(sortType: string) {
            this.sort = sortType;
            useItemsStore().fetchItemsFromDB();
        },
    },
});
