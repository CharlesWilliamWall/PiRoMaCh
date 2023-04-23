// import { defineStore } from "pinia";
// import { useItemsStore } from "@/stores/items";
// import type Item from "@/interfaces/Item";

// export const useRatingStore = defineStore({
//     id: "rating",
//     state: () => ({
//         ratings: [] as Item[],
//         grade: 0,
//         maxHearts: 5,
//         hasCounter: false,
//     }),
//     getters: {
//         getRating: (state) => (id: number) => {
//             return state.ratings.find((r) => r.id === id);
//         },
//     },
//     actions: {
//         addRating(item: Item) {
//             this.ratings.push(item);
//         },
//     },
// });
