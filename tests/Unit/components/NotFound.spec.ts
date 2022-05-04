import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "../../../src/router/router"

import NotFound from '../../../src/components/Custom/NotFound.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

describe('Test component NotFound', () => {

    let wrapper: VueWrapper<any>;
    beforeAll(async () => {

        wrapper = mount(NotFound, {
            global: {
                stubs: {
                    RouterLink: RouterLinkStub
                },
                plugins: [router]
            }
        })
    })
    it('Render component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Test enter in not found page', async () => {
        router.push('/asdkaksdaksd')
        expect(wrapper.html()).toContain('404')
    })
})