import { mount, flushPromises, VueWrapper, config } from '@vue/test-utils'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { routes } from "../../../src/router/router"
import { formatDate as formatDateMock } from '../../__mocks__/helpers/filters'
import PostCard from '../../../src/components/Posts/PostCard/PostCard.vue'

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

describe('Test component PostCard', () => {
    let wrapper: VueWrapper;

    let router: Router;
    beforeAll(async () => {
        router = createRouter({
            history: createWebHistory(),
            routes: routes,
        })

        router.push('/')
        await router.isReady()

        wrapper = mount(PostCard, {
            global: {
                plugins: [router],
            }
        })
    });
    it('Component was render', () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Props default', async () => {
        const wrapper = mount(PostCard, {
            global: {
                plugins: [router],
            }
        })
        expect(wrapper.props().post).toEqual({
            title: '',
            body: '',
            metadata: {
                publishedAt: 0,
                authorId: 0,
            },
            author_name: '',
        })
        expect(wrapper.props().showPreview).toBeTruthy()
    })
    it('Test hide preview post body', async () => {
        await wrapper.setProps({ showPreview: false })
        const previewBody = wrapper.find('.post-card__preview')

        expect(wrapper.props().showPreview).toBeFalsy()
        expect(previewBody.exists()).toBeFalsy()
    })
    it('Mount component with props', async () => {
        // Set props
        await wrapper.setProps({ post: mockPost, showPreview: true })

        expect(wrapper.props().post).toEqual(mockPost)

        const postTitle = wrapper.find('.post-card__title')
        const postBody = wrapper.find('.post-card__preview')
        const postAuthorName = wrapper.find('.post-card__metadata__author')
        const postPublishedAt = wrapper.find('.post-card__metadata__date')

        expect(postTitle.text()).toEqual('A mock title post')
        expect(postBody.exists()).toBeTruthy()
        expect(postBody.text()).toEqual('Lorem ipsum body text')
        expect(postAuthorName.text()).toEqual("By Tester X")
        expect(postPublishedAt.text()).toEqual("Published At | 12/04/2017")
    })
    it('Test READ MORE button click redirect to post', async () => {
        // Set props
        await wrapper.setProps({ post: mockPost, showPreview: true })

        const spyRouterPush = jest.spyOn(router, 'push').mockImplementation();
        const readMoreButton = wrapper.find('.post-card__button')

        await readMoreButton.trigger('click')

        await flushPromises()

        const postnameFormat = mockPost.title.toLowerCase().replace(/[^A-Z0-9]/gi, '-');

        expect(spyRouterPush).toHaveBeenCalled()
        expect(spyRouterPush).toHaveBeenCalledWith({
            name: "post-postname",
            params: { postname: postnameFormat }
        })
    })
})

