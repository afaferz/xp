/* eslint-disable */
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module 'vue/types/vue' {
    import type VueRouter from 'vue-router'
    interface Vue {
        $router: typeof VueRouter
    }
}