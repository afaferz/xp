import { config, flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex'
import { postModuleWithData } from '../../__mocks__/store/post-module'
import { formatDate as formatDateMock } from '../../__mocks__/helpers/filters'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from "../../../src/router/router"
import { defineComponent, nextTick } from 'vue'
import Home from '../../../src/views/Home.vue'


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

// Create app with suspense component to HOME view
const App = defineComponent({
    components: { Home },
    template: '<Suspense><Home/></Suspense>',
})

describe('Testing page Home', () => {
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
                plugins: [storePost, router],
                stubs: ['router-view', 'router-link']
            }
        })
        await nextTick()
        wrapper = mount(App, {
            global: {
                plugins: [storePost, router],
                stubs: ['router-view', 'router-link']
            }
        })
    })
    it('Render page', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Testing calling onMounted', async () => {

    })
})