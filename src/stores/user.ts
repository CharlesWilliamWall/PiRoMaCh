import { defineStore } from "pinia";
import { signIn, fetchCurrentUser, createUser, signOut } from "@/services";
import type { User, UserForm, UserSignIn } from "@/interfaces/User";
import { useOrderStore } from "./order";

interface UserState {
    currentUser: User | null | undefined;
    error: any;
}

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        currentUser: undefined,
        error: null,
    }),

    getters: {
        isAuthenticated(): boolean {
            return !!this.currentUser;
        },
    },
    actions: {
        async createUser(data: UserForm) {
            try {
                this.currentUser = await createUser(data);
                this.error = null;
            } catch (error: any) {
                this.currentUser = undefined;
                this.error = error;
            }
        },

        async signIn(data: UserSignIn) {
            try {
                this.currentUser = await signIn(data);
                this.error = null;
            } catch (error: any) {
                this.currentUser = undefined;
                this.error = error;
            }
        },
        async fetchCurrentUser() {
            try {
                this.currentUser = await fetchCurrentUser();
                this.error = null;
            } catch (error: any) {
                this.currentUser = undefined;
                this.error = error;
            }
        },
        async signOut() {
            try {
                await signOut();
                this.currentUser = null;
                this.error = null;
            } catch (error: any) {
                this.error = error;
            }
        },
        async saveOrders() {
            try {
                this.currentUser = await fetchCurrentUser();
                if (this.currentUser) {
                    const orderStore = useOrderStore();
                }
                this.error = null;
            } catch (error: any) {
                this.currentUser = undefined;
                this.error = error;
            }
        },
    },
});
