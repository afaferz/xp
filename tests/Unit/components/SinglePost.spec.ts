import { mount, flushPromises, VueWrapper, config } from '@vue/test-utils'
import { formatDate as formatDateMock } from '../../__mocks__/helpers/filters'
import { postModuleWithData } from '../../__mocks__/store/post-module'
import { postModuleWithoutData } from '../../__mocks__/store/post-module'
import { createStore } from 'vuex'
import SinglePost from '@/components/Posts/SinglePost.vue'
import { useRouter, useRoute } from 'vue-router'

jest.mock('vue-router', () => ({
    useRoute: jest.fn(),
    useRouter: jest.fn(() => ({
        push: () => { }
    }))
}))

config.global.mocks = {
    $filters: {
        formatDate: (dateInMs: number) => { return formatDateMock(dateInMs) }
    }
}

const mockPost = {
    title: "A mock title post",
    body: "Lorem ipsum body text",
    metadata: { publishedAt: 1492004832000, authorId: 1 },
    author_name: 'Tester X'
}

const store = createStore({
    modules: {
        posts: postModuleWithData
    }
})

describe('Test component SinglePost', () => {
    let wrapper: VueWrapper<any>;
    beforeAll(async () => {

        // @ts-ignore
        useRoute.mockImplementationOnce(() => ({
            params: {
                postname: 'a-mock-post'
            }
        }))

        wrapper = mount(SinglePost, {
            global: {
                plugins: [store],
            }
        })

    });
    it('Render component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Testing with previous post list in store', async () => {
        // @ts-ignore
        useRoute.mockImplementationOnce(() => ({
            params: {
                postname: 'a-mock-post'
            }
        }))
        const title = wrapper.find('.single-post__title')
        const date = wrapper.find('.single-post__metadata__date')
        const authorname = wrapper.find('.single-post__metadata__authorname')
        const body = wrapper.find('.single-post__content')

        expect(title.text()).toEqual('A mock post')
        expect(wrapper.vm.title).toEqual('A mock post')

        expect(body.text()).toEqual('Lorem ipsum')

        expect(date.text()).toEqual('Published At | 12/04/2017')
        expect(authorname.text()).toEqual("By | Mock Author")
        expect(wrapper.vm.metadata).toEqual({ "authorId": 1, "id": 1, "publishedAt": 1492004832000 })
    })
    it('Testing without previous post list in store', async () => {
        // @ts-ignore
        useRoute.mockImplementationOnce(() => ({
            params: {
                postname: 'a-mock-post'
            }
        }))
        const store = createStore({
            modules: {
                posts: postModuleWithoutData
            }
        })
        const wrapper = mount(SinglePost, {
            global: {
                plugins: [store],
            }
        })

        expect(wrapper.vm.title).toEqual('')
        expect(wrapper.vm.body).toEqual('')
        expect(wrapper.vm.metadata).toEqual({ "authorId": null, "publishedAt": 0 })
        expect(wrapper.vm.author_name).toEqual('')

    })
})