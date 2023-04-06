import { useUserStore } from "@/stores/user";

export function isAuthenticatedGuard() {
    const userStore = useUserStore();
    if (!userStore.isAuthenticated) {
        return "/";
    }
}
export function isNotAuthenticatedGuard() {
    const userStore = useUserStore();
    if (userStore.isAuthenticated) {
        return "/";
    }
}
