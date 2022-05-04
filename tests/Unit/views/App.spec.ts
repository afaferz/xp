import { mount } from '@vue/test-utils'
import App from '../../../src/App.vue'


const wrapper = mount(App, {
    global: {
        stubs: ['router-view']
    }
})

describe('Testing app', () => {
    it('Render', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
})