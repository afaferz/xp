import { mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex'
import PostList from '@/components/Posts/PostList.vue'
import { postModuleWithData } from '../../__mocks__/store/post-module'
import { postModuleWithoutData } from '../../__mocks__/store/post-module'
import gsap from 'gsap'

const storePost = createStore({
    modules: {
        posts: postModuleWithData
    }
})

describe('Test component PostList', () => {
    //@TO-DO Change any type to PostList type
    let wrapper: VueWrapper<any>;
    beforeAll(() => {
        wrapper = mount(PostList, {
            global: {
                stubs: ['PostCard', 'LoaderCustom'],
                plugins: [storePost]
            }
        })
    })
    it('Component was render', () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Test get posts list with vuex', async () => {
        const mockPostList = [
            {
                title: 'A mock post',
                body: 'Lorem ipsum',
                metadata: { id: 1, publishedAt: 1492004832000, authorId: 1 },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 2',
                body: 'Lorem ipsum',
                metadata: { id: 2, publishedAt: 1431006432000, authorId: 2 },
                author_name: 'Mock Author 2'
            },
            {
                title: 'A mock post 3',
                body: 'Lorem ipsum',
                metadata: { id: 3, publishedAt: 1490010372000, authorId: 1 },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 4',
                body: 'Lorem ipsum',
                metadata: { id: 4, publishedAt: 1470166495000, authorId: 3 },
                author_name: 'Mock Author 3'
            }
        ]
        expect(wrapper.vm.postList).toEqual(mockPostList)
    })
    it('Test get recently post list with vuex', async () => {
        const mockRecentlyPostList = [
            {
                title: 'A mock post',
                body: 'Lorem ipsum',
                metadata: { id: 1, publishedAt: 1492004832000, authorId: 1 },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 3',
                body: 'Lorem ipsum',
                metadata: { id: 3, publishedAt: 1490010372000, authorId: 1 },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 4',
                body: 'Lorem ipsum',
                metadata: { id: 4, publishedAt: 1470166495000, authorId: 3 },
                author_name: 'Mock Author 3'
            }
        ]

        expect((wrapper.vm as typeof PostList).recentlyPostList).toEqual(mockRecentlyPostList)
    })
    it('Test get posts without post list in vuex', async () => {
        // Mounting component again to get store without data
        const storePost = createStore({
            modules: {
                posts: postModuleWithoutData
            }
        })

        const wrapper = mount(PostList, {
            global: {
                stubs: ['PostCard'],
                plugins: [storePost]
            }
        })

        const postListCards = wrapper.findAll('[data-jest="post-card__item"]')
        const postListNoCards = wrapper.find('.post-list__no-result')

        // No post found
        expect(wrapper.vm.postList).toEqual([])
        expect(wrapper.vm.postList.length).toEqual(0)

        // No PostCard render
        expect(postListCards.length).toEqual(0)
        // Not found post message render
        expect(postListNoCards.isVisible()).toBeTruthy()
    })
    describe('Testing transition events', () => {
        let mockLiElement: HTMLLIElement;
        let mockPostCard: HTMLDivElement;
        beforeAll(() => {
            mockLiElement = document.createElement('li')
            mockPostCard = document.createElement('div')
            mockPostCard.setAttribute('data-index', '0')
            mockPostCard.dataset.index = '0'
            mockLiElement.append(mockPostCard)
        })
        it('onBeforeEnter', async () => {
            // onBeforeEnter
            wrapper.vm.onBeforeEnter(mockLiElement)
            expect(mockLiElement.style.opacity).toEqual('0')
            expect(mockLiElement.style.height).toEqual('0px')
        })
        it('onEnter', async () => {
            const doneCb = jest.fn().mockImplementationOnce(() => {
                mockLiElement.style.opacity = '1'
                mockLiElement.style.height = '1rem'
            })


            /* === Active method setup == */
            wrapper.vm.onEnter(mockLiElement, doneCb)

            /* === Mock method setup == */
            const mockMethodOnEnter = jest.fn().mockImplementation((el, done) => {
                gsap.to(el, {
                    opacity: 1,
                    height: '1.6em',
                    delay: el.dataset.index * 0.15,
                    onComplete: done,
                });
            })
            wrapper.vm.onEnter = mockMethodOnEnter
            wrapper.vm.onEnter(mockLiElement, doneCb)
            expect(mockMethodOnEnter).toHaveBeenCalled()
        })
        it('onLeave', async () => {
            const doneCb = jest.fn().mockImplementationOnce(() => {
                mockLiElement.style.opacity = '1'
                mockLiElement.style.height = '1rem'
            })

            /* === Active method setup == */
            wrapper.vm.onLeave(mockLiElement, doneCb)

            /* === Mock method setup == */
            const mockMethodOnLeave = jest.fn().mockImplementation((el, done) => {
                gsap.to(el, {
                    opacity: 1,
                    height: 'auto',
                    delay: el.dataset.index * 0.15,
                    onComplete: done,
                });
            })
            wrapper.vm.onEnter = mockMethodOnLeave
            wrapper.vm.onEnter(mockLiElement, doneCb)
            expect(mockMethodOnLeave).toHaveBeenCalled()
        })
    })
})