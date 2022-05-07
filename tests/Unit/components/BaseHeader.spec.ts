import { mount, RouterLinkStub } from '@vue/test-utils'
import BaseHeader from '@/components/BaseHeader.vue'
import { routes } from '@/router/router'
import { createRouter, createWebHistory } from 'vue-router'
import { debounce } from '@/common/helpers/debounce'
import { nextTick } from 'vue'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})
jest.useFakeTimers()
describe('Test BaseHeader component', () => {
    const wrapper = mount(BaseHeader, {
        global: {
            plugins: [router],
            stubs: {
                RouterLink: RouterLinkStub
            }
        }
    })

    let scrollY: jest.Mock
    let debouncedScrollY: Function
    beforeAll(async () => {

        scrollY = jest.fn()
        debouncedScrollY = debounce(scrollY, 500)

        router.push('/')
        await router.isReady()
    })

    it('Render component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Testing header value in ref', async () => {
        await nextTick();

        // Não consegui testar a ref com o Composition API
        expect(wrapper.vm.$refs).toHaveProperty('header')
    })
    it('Testing scrollY function debounced', async () => {
        for (let i = 0; i < 50; i++) {
            debouncedScrollY()
        }

        jest.runAllTimers();

        // Debounce called with a function
        expect(scrollY).toHaveBeenCalledTimes(1)
    })
    it('Testing shrinkHeader', async () => {
        const spyOnShrinkHeader = jest.spyOn(wrapper.vm, 'shrinkHeader')

        jest.advanceTimersByTime(500);
        wrapper.vm.shrinkHeader()
        expect(spyOnShrinkHeader).toHaveBeenCalledTimes(1)
    })
})