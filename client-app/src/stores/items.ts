import axios from "@/utils/axios";
import { defineStore } from "pinia";
import { useFiltersStore } from "@/stores/filters";
import { usePaginationStore } from "@/stores/pagination";
import type { Item } from "@/interfaces/Item";

export const useItemsStore = defineStore("items", {
    state: () => ({
        items: [] as Item[],
        currentItem: {} as Item,
        isLoadingItems: false as boolean, // pour savoir si besoin d'afficher spinner
        currentPromoItems: [] as Item[],
    }),
    getters: {},
    actions: {
        async fetchItemsFromDB() {
            this.isLoadingItems = true;
            const filtersStore = useFiltersStore(); // doit être déclaré dans la fonction, car dépend d'un autre store
            const paginationStore = usePaginationStore(); // doit être déclaré dans la fonction, car dépend d'un autre store

            try {
                const response = await axios.get(
                    `/items?search=${filtersStore.search}&sort=${filtersStore.sort}&minPrice=${filtersStore.minPrice}&maxPrice=${filtersStore.maxPrice}&minDate=${filtersStore.minDate}&maxDate=${filtersStore.maxDate}&dep=${filtersStore.dep}&rating=${filtersStore.rating}&page=${paginationStore.page}&limit=${paginationStore.limit}&promosOnly=${filtersStore.promosOnly}`
                );

                this.items = response.data.items;
                paginationStore.total = response.data.count;
            } catch (error) {
                this.items = [] as Item[];
                paginationStore.total = 0;
                console.log(error);
            } finally {
                this.isLoadingItems = false;
            }
        },
        async fetchPromoItemsFromDB() {
            this.isLoadingItems = true;
            try {
                const response = await axios.get(`/items?promosOnly=true`);
                this.currentPromoItems = response.data.items;
            } catch (error) {
                this.currentPromoItems = [] as Item[];
                console.log(error);
            } finally {
                this.isLoadingItems = false;
            }
        }, // Lance requête serveur pour obtenir l'array d'items disponible pour affichage via itemsStore.items // Lance requête serveur pour obtenir l'array d'items disponible pour affichage via itemsStore.items

        async fetchItemFromDB(objectID: any) {
            try {
                const response = await axios.get(`/item/${objectID}`);
                this.currentItem = response.data.item;
            } catch (error) {
                this.currentItem = {} as Item;
                console.log(error);
            }
        },

        // async loadItem(objectID: any) {
        //     const itemsStore = useItemsStore();
        //     const filtersStore = useFiltersStore();
        //     if (filtersStore.promosOnly) {
        //         itemsStore.currentItem = itemsStore.currentPromoItems.find(
        //             (item) => item.objectID === objectID
        //         ) as Item;
        //     } else {
        //         itemsStore.currentItem = itemsStore.items.find((item) => item.objectID === objectID) as Item;
        //     }
        // },
    },
});
