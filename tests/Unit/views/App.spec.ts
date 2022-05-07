import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory, RouterView } from 'vue-router'
import { routes } from '@/router/router'
import { defineComponent } from 'vue'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

// Stubbed all components include router-view
const App = defineComponent({
    components: {},
    template: '<Suspense></Suspense>',
})

describe('Testing app', () => {
    const wrapper = mount(App, {
        global: {
            plugins: [router],
            stubs: {
                RouterView: RouterView
            }
        }
    })
    it('Render', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
})