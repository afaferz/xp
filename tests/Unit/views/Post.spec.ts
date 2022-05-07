import { config, flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex'
import { postModuleWithData } from '../../__mocks__/store/post-module'
import { formatDate as formatDateMock } from '../../__mocks__/helpers/filters'
import { createRouter, createWebHistory, Router, RouterView } from 'vue-router'
import { routes } from "@/router/router"
import { defineComponent, nextTick } from 'vue'
import Post from '@/views/Post.vue'


const storePost = createStore({
    modules: {
        posts: postModuleWithData
    }
})

config.global.mocks = {
    $filters: {
        formatDate: (dateInMs: number) => { return formatDateMock(dateInMs) }
    }
}

// Create app with suspense component to SINGLE POST view
const App = defineComponent({
    components: { Post },
    template: '<Suspense><Post/></Suspense>',
})

describe('Testing page Post', () => {
    let wrapper: VueWrapper;
    let router: Router;
    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        })

        router.push('/')
        await router.isReady()
        wrapper = mount(App, {
            global: {
                plugins: [storePost, router]
            },
        })
        await flushPromises()
    })
    it('Render page', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Testing with has a post in store', async () => {

    })
})