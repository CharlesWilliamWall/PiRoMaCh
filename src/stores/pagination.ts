import { defineStore } from "pinia";
import { useItemsStore } from "@/stores/items";

export const usePaginationStore = defineStore("pagination", {
    state: () => ({
        limit: 12,
        page: 1,
        total: 0,
        currentPage: 1,
    }),
    getters: {
        getLastPage(state: any): number {
            this.total = Math.ceil(state.total / state.limit);
            return this.total;
        },
        pagesToShow(state: any): number[] {
            const pages: number[] = [];
            const lastPage = state.getLastPage;
            const currentPage = state.currentPage;
            if (lastPage <= 5) {
                for (let i = 1; i <= lastPage; i++) {
                    pages.push(i);
                }
            } else if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pages.push(i);
                }
            } else if (currentPage >= lastPage - 2) {
                for (let i = lastPage - 4; i <= lastPage; i++) {
                    pages.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pages.push(i);
                }
            }
            return pages;
        },
    },
    actions: {
        setlimit(event: any) {
            this.limit = event.target.value;
            const itemStore = useItemsStore();
            this.currentPage = 1;
            this.page = this.currentPage;
            itemStore.fetchItemsFromDB();
        },
        setPage(page: number) {
            this.currentPage = page;
            this.page = this.currentPage;
            const itemStore = useItemsStore();

            itemStore.fetchItemsFromDB();
        },
    },
});
