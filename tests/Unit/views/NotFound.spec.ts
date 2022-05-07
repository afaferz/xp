import NotFoundPage from '@/views/NotFoundPage.vue'
import { mount } from '@vue/test-utils'

describe('Test page NotFound', () => {
    it('Render page', async () => {
        const wrapper = mount(NotFoundPage)
        expect(wrapper.vm).toBeTruthy()
    })
})