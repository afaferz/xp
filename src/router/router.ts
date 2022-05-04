import { createRouter, createWebHistory } from "vue-router";
import { RouteRecordRaw } from "vue-router";
import NotFound from '../views/NotFound.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        alias: "/",
        name: "home",
        component: () => import("../views/Home.vue"),
    },
    {
        path: "/posts/:postname",
        alias: "/posts/:postname",
        name: "post-postname",
        component: () => import("../views/Post.vue"),
        sensitive: true,
    },
    // { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export { routes };
export default router;
