import { mount } from '@vue/test-utils'
import App from '@/App.vue'


const wrapper = mount(App)

describe('Testing app', () => {
    it('Render', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
})