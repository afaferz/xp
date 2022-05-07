import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import NotFoundPage from '@/views/NotFoundPage.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/posts/:postname",
        alias: "/posts/:postname",
        name: "post-postname",
        component: () => import("@/views/Post.vue"),
        sensitive: true,
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { routes };
export default router;
