import { createRouter, createWebHistory, useRoute } from "vue-router";
import AllView from "./views/AllView.vue";
import UserProfileView from "@/views/UserProfileView.vue";
import ItemInfo from "@/components/items/ItemInfo.vue";
import { useUserStore } from "./stores/user";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "./guards";
import NotFound404 from "./components/NotFound404.vue";
import signin from "@/components/SignIn.vue";
import signUp from "@/components/SignUp.vue";
// import CheckOutView from "@/views/CheckOutView.vue";
import PrintInvoice from "@/components/checkout/tabs/PrintInvoice.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: AllView,
            props: true,

            children: [
                {
                    path: "/signin",
                    name: "signin",
                    beforeEnter: isNotAuthenticatedGuard,
                    component: signin,
                },
                {
                    path: "/signup",
                    name: "signup",
                    beforeEnter: isNotAuthenticatedGuard,
                    component: signUp,
                },
            ],
        },
        {
            path: "/home",
            redirect: "/",
        },
        {
            path: "/user",
            name: "user",
            beforeEnter: isAuthenticatedGuard,
            component: UserProfileView,
        },
        {
            path: "/item/:objectID",
            name: "item",
            component: ItemInfo,
        },
        // {
        //     path: "/checkout",
        //     name: "checkout",
        //     component: CheckOutView,
        // },
        {
            path: "/invoice",
            name: "invoice",
            component: PrintInvoice,
        },
        {
            path: "/:catchall(.*)*",
            name: "NotFound404",
            component: NotFound404,
        },
    ],
});

router.beforeEach(async () => {
    const userStore = useUserStore();
    if (userStore.currentUser == undefined) {
        await userStore.fetchCurrentUser();
    }
});

export default router;
