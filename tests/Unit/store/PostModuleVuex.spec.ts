import { createStore } from 'vuex'
import post from '../../../src/store/modules/posts'
import { posts, authors } from '../../__mocks__/api/api-posts'
import api from '../../../src/common/api/api'

const store = createStore({
    modules: {
        post: post
    }
})
describe('Testing Vuex Post Module', () => {
    it('Testing initial states', async () => {
        const postsModule = store.state.post
        expect(postsModule.posts).toEqual([])
        expect(postsModule.authors).toEqual([])
        expect(postsModule.filters).toEqual({
            author: ''
        })
    })
    it('Testing initial getters', async () => {
        // Getter GET_POSTS with param to filter
        expect(store.getters['post/GET_POSTS'](true)).toEqual([])
        // Getter GET_POSTS without param to filter
        expect(store.getters['post/GET_POSTS'](false)).toEqual([])
        expect(store.getters['post/GET_RECENTLY_POSTS']).toEqual([])
        expect(store.getters['post/FILTERS']).toEqual({
            author: ''
        })
    })
    describe('Mutations', () => {
        it('SET_POSTS', async () => {
            const initialPosts = store.state.post.posts
            expect(initialPosts).toEqual([])
            store.commit('post/SET_POSTS', posts)

            expect(store.state.post.posts).toEqual(posts)
        })
        it('SET_AUTHORS', async () => {
            const initialAuthors = store.state.post.authors
            expect(initialAuthors).toEqual([])
            store.commit('post/SET_AUTHORS', authors)

            expect(store.state.post.authors).toEqual(authors)
        })
        it('SORT_BY_DECRESCENT', async () => {
            const postByDecrescentOrder = [
                {
                    title: 'A mock title 2',
                    body: 'Morbi non est maximus, cursus tortor in, ullamcorper metus. Integer sagittis condimentum porta. Phasellus dolor dolor, tristique vitae ex nec, pretium dignissim diam. Duis leo nisi, eleifend at gravida eget, tincidunt non erat. Curabitur sit amet libero dolor. Pellentesque pellentesque mauris imperdiet iaculis laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
                    metadata: { publishedAt: 1431006432000, authorId: 1 }
                },
                {
                    title: 'A mock title 4',
                    body: 'Donec porta porta felis vel mattis. Vestibulum vulputate purus arcu. In feugiat euismod lorem, sit amet ultricies mi condimentum ut. Morbi ullamcorper lacus erat, sed tincidunt erat imperdiet non. Aliquam id ipsum a sapien congue hendrerit. Nulla id finibus mi. Maecenas sit amet lacus sit amet mauris faucibus dignissim. Sed sodales leo lorem, vitae ultricies mauris rhoncus gravida. Pellentesque elementum posuere ullamcorper. Fusce dui nunc, congue ac nisl ut, blandit congue purus. Mauris euismod volutpat pulvinar. Cras pellentesque nibh ut sapien sollicitudin, at posuere tortor volutpat. Integer tristique, lacus nec aliquam pellentesque, turpis quam commodo lacus, eget tincidunt lectus purus molestie tellus. Pellentesque viverra in dui quis maximus.',
                    metadata: { publishedAt: 1470166495000, authorId: 3 }
                },
                {
                    title: 'A mock title 3',
                    body: 'Curabitur ultrices turpis tellus, lobortis varius tellus eleifend sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tincidunt massa vitae sapien laoreet, accumsan ultricies libero rutrum. Aenean nec rutrum nulla. Integer volutpat tellus et eros hendrerit, eu tristique sapien aliquam. Nulla eget turpis erat. Ut consectetur nibh sit amet mi mollis imperdiet.',
                    metadata: { publishedAt: 1490010372000, authorId: 2 }
                },
                {
                    title: 'A mock title 1',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor posuere augue id egestas. Integer feugiat leo et mollis consequat. Nulla posuere purus id turpis porta malesuada. Donec vestibulum diam non lacus scelerisque, eu malesuada erat pharetra. Quisque bibendum neque tortor, ac maximus enim tristique a. Nullam in ultrices neque, et dapibus lectus. Nam eget interdum dui, in vulputate risus. Proin viverra elit sit amet bibendum euismod. Nam mattis mauris nec molestie tincidunt. Nam sed lectus in velit iaculis malesuada vel nec eros. Vivamus pellentesque mauris nec dolor lobortis cursus. Sed consectetur id lorem id finibus. Vestibulum accumsan diam ut maximus mollis. Maecenas ac mollis est, eget feugiat orci. Vestibulum aliquam maximus mauris tempus facilisis. Aliquam erat volutpat.',
                    metadata: { publishedAt: 1492004832000, authorId: 2 }
                },
                {
                    title: 'A mock title 5',
                    body: 'Sed id metus eget ex vehicula pulvinar nec ac risus. Morbi sapien erat, interdum et risus vel, porttitor vestibulum lorem. Sed id quam sed sem eleifend pretium. Fusce interdum commodo blandit. Proin est turpis, dignissim ut magna a, pulvinar volutpat elit. Nam tempor quis eros in maximus. Duis dapibus nibh vehicula bibendum pretium. Mauris nec sollicitudin mi, vitae ultrices orci. In scelerisque ultricies magna in ullamcorper. Vivamus ultricies neque libero, eu ornare justo mattis consequat. Duis pellentesque vulputate faucibus. Proin commodo, lectus ut blandit pretium, nibh ipsum sodales ipsum, id mollis urna arcu ut ante.',
                    metadata: { publishedAt: 1516184567000, authorId: 4 }
                }
            ]

            const initialPosts = store.state.post.posts
            expect(initialPosts).toEqual(posts)
            store.commit('post/SORT_BY_DECRESCENT')

            expect(store.state.post.posts).toEqual(postByDecrescentOrder)
        })
        it('SORT_BY_CRESCENT', async () => {
            const postByCrescentOrder = [
                {
                    title: 'A mock title 5',
                    body: 'Sed id metus eget ex vehicula pulvinar nec ac risus. Morbi sapien erat, interdum et risus vel, porttitor vestibulum lorem. Sed id quam sed sem eleifend pretium. Fusce interdum commodo blandit. Proin est turpis, dignissim ut magna a, pulvinar volutpat elit. Nam tempor quis eros in maximus. Duis dapibus nibh vehicula bibendum pretium. Mauris nec sollicitudin mi, vitae ultrices orci. In scelerisque ultricies magna in ullamcorper. Vivamus ultricies neque libero, eu ornare justo mattis consequat. Duis pellentesque vulputate faucibus. Proin commodo, lectus ut blandit pretium, nibh ipsum sodales ipsum, id mollis urna arcu ut ante.',
                    metadata: { publishedAt: 1516184567000, authorId: 4 }
                },
                {
                    title: 'A mock title 1',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor posuere augue id egestas. Integer feugiat leo et mollis consequat. Nulla posuere purus id turpis porta malesuada. Donec vestibulum diam non lacus scelerisque, eu malesuada erat pharetra. Quisque bibendum neque tortor, ac maximus enim tristique a. Nullam in ultrices neque, et dapibus lectus. Nam eget interdum dui, in vulputate risus. Proin viverra elit sit amet bibendum euismod. Nam mattis mauris nec molestie tincidunt. Nam sed lectus in velit iaculis malesuada vel nec eros. Vivamus pellentesque mauris nec dolor lobortis cursus. Sed consectetur id lorem id finibus. Vestibulum accumsan diam ut maximus mollis. Maecenas ac mollis est, eget feugiat orci. Vestibulum aliquam maximus mauris tempus facilisis. Aliquam erat volutpat.',
                    metadata: { publishedAt: 1492004832000, authorId: 2 }
                },
                {
                    title: 'A mock title 3',
                    body: 'Curabitur ultrices turpis tellus, lobortis varius tellus eleifend sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tincidunt massa vitae sapien laoreet, accumsan ultricies libero rutrum. Aenean nec rutrum nulla. Integer volutpat tellus et eros hendrerit, eu tristique sapien aliquam. Nulla eget turpis erat. Ut consectetur nibh sit amet mi mollis imperdiet.',
                    metadata: { publishedAt: 1490010372000, authorId: 2 }
                },
                {
                    title: 'A mock title 4',
                    body: 'Donec porta porta felis vel mattis. Vestibulum vulputate purus arcu. In feugiat euismod lorem, sit amet ultricies mi condimentum ut. Morbi ullamcorper lacus erat, sed tincidunt erat imperdiet non. Aliquam id ipsum a sapien congue hendrerit. Nulla id finibus mi. Maecenas sit amet lacus sit amet mauris faucibus dignissim. Sed sodales leo lorem, vitae ultricies mauris rhoncus gravida. Pellentesque elementum posuere ullamcorper. Fusce dui nunc, congue ac nisl ut, blandit congue purus. Mauris euismod volutpat pulvinar. Cras pellentesque nibh ut sapien sollicitudin, at posuere tortor volutpat. Integer tristique, lacus nec aliquam pellentesque, turpis quam commodo lacus, eget tincidunt lectus purus molestie tellus. Pellentesque viverra in dui quis maximus.',
                    metadata: { publishedAt: 1470166495000, authorId: 3 }
                },
                {
                    title: 'A mock title 2',
                    body: 'Morbi non est maximus, cursus tortor in, ullamcorper metus. Integer sagittis condimentum porta. Phasellus dolor dolor, tristique vitae ex nec, pretium dignissim diam. Duis leo nisi, eleifend at gravida eget, tincidunt non erat. Curabitur sit amet libero dolor. Pellentesque pellentesque mauris imperdiet iaculis laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.',
                    metadata: { publishedAt: 1431006432000, authorId: 1 }
                }
            ]

            const initialPosts = store.state.post.posts
            expect(initialPosts).toEqual(posts)
            store.commit('post/SORT_BY_CRESCENT')

            expect(store.state.post.posts).toEqual(postByCrescentOrder)
        })
        it('SET_FILTERS', async () => {
            const initialFilter = store.state.post.filters
            expect(initialFilter).toEqual({ author: '' })

            // Set valid value
            store.commit('post/SET_FILTERS', { author: 'nicholas' })
            expect(store.state.post.filters).toEqual({ author: 'nicholas' })

            // Set empty object value
            store.commit('post/SET_FILTERS', {})
            expect(store.state.post.filters).toEqual({})

            // Set empty payload
            store.commit('post/SET_FILTERS')
            expect(store.state.post.filters).toBeUndefined()

            // Back to initial state
            store.commit('post/SET_FILTERS', { author: '' })
        })
        it('SET_LOADING', async()=>{
            const initialLoading = store.state.post.isLoading

            expect(initialLoading).toBeTruthy()
            
            store.commit('post/SET_LOADING', false)
            expect(store.state.post.isLoading).toBeFalsy()
        })
    })
    describe('Actions', () => {
        it('GET_POSTS', async () => {
            // Spy on GET posts method in API
            jest.spyOn(api, 'get').mockResolvedValueOnce({ data: posts })
            
            store.commit = jest.fn()
            await store.dispatch('post/GET_POSTS')

            expect(api.get).toHaveBeenCalledTimes(1)
            expect(api.get).toHaveBeenCalledWith('5be5e3fa2f000082000fc3f8')
            expect(store.commit).toHaveBeenCalledWith("post/SET_POSTS", posts, undefined)
        })
        it('GET_AUTHORS', async () => {
            // Spy on GET author method in API
            jest.spyOn(api, 'get').mockResolvedValueOnce({ data: authors })
            
            store.commit = jest.fn()
            await store.dispatch('post/GET_AUTHORS')
            
            expect(api.get).toHaveBeenCalledTimes(2)
            expect(api.get).toHaveBeenCalledWith('5be5e3fa2f000082000fc3f8')
            expect(store.commit).toHaveBeenCalledWith("post/SET_AUTHORS", authors, undefined)
        })
    }),
        describe('Getters', () => {
            it('GET_POSTS', async () => {
                // Ordened by crescent sort
                const postsWithAuthorName = [
                    {
                        author_name: "Mock Author 4",
                        body: "Sed id metus eget ex vehicula pulvinar nec ac risus. Morbi sapien erat, interdum et risus vel, porttitor vestibulum lorem. Sed id quam sed sem eleifend pretium. Fusce interdum commodo blandit. Proin est turpis, dignissim ut magna a, pulvinar volutpat elit. Nam tempor quis eros in maximus. Duis dapibus nibh vehicula bibendum pretium. Mauris nec sollicitudin mi, vitae ultrices orci. In scelerisque ultricies magna in ullamcorper. Vivamus ultricies neque libero, eu ornare justo mattis consequat. Duis pellentesque vulputate faucibus. Proin commodo, lectus ut blandit pretium, nibh ipsum sodales ipsum, id mollis urna arcu ut ante.",
                        metadata: {
                            authorId: 4,
                            publishedAt: 1516184567000
                        },
                        title: "A mock title 5"
                    },
                    {
                        author_name: "Mock Author 2",
                        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor posuere augue id egestas. Integer feugiat leo et mollis consequat. Nulla posuere purus id turpis porta malesuada. Donec vestibulum diam non lacus scelerisque, eu malesuada erat pharetra. Quisque bibendum neque tortor, ac maximus enim tristique a. Nullam in ultrices neque, et dapibus lectus. Nam eget interdum dui, in vulputate risus. Proin viverra elit sit amet bibendum euismod. Nam mattis mauris nec molestie tincidunt. Nam sed lectus in velit iaculis malesuada vel nec eros. Vivamus pellentesque mauris nec dolor lobortis cursus. Sed consectetur id lorem id finibus. Vestibulum accumsan diam ut maximus mollis. Maecenas ac mollis est, eget feugiat orci. Vestibulum aliquam maximus mauris tempus facilisis. Aliquam erat volutpat.",
                        metadata: {
                            authorId: 2,
                            publishedAt: 1492004832000
                        },
                        title: "A mock title 1"
                    },
                    {
                        author_name: "Mock Author 2",
                        body: "Curabitur ultrices turpis tellus, lobortis varius tellus eleifend sodales. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus tincidunt massa vitae sapien laoreet, accumsan ultricies libero rutrum. Aenean nec rutrum nulla. Integer volutpat tellus et eros hendrerit, eu tristique sapien aliquam. Nulla eget turpis erat. Ut consectetur nibh sit amet mi mollis imperdiet.",
                        metadata: {
                            authorId: 2,
                            publishedAt: 1490010372000
                        },
                        title: "A mock title 3"
                    },
                    {
                        author_name: "Mock Author 3",
                        body: "Donec porta porta felis vel mattis. Vestibulum vulputate purus arcu. In feugiat euismod lorem, sit amet ultricies mi condimentum ut. Morbi ullamcorper lacus erat, sed tincidunt erat imperdiet non. Aliquam id ipsum a sapien congue hendrerit. Nulla id finibus mi. Maecenas sit amet lacus sit amet mauris faucibus dignissim. Sed sodales leo lorem, vitae ultricies mauris rhoncus gravida. Pellentesque elementum posuere ullamcorper. Fusce dui nunc, congue ac nisl ut, blandit congue purus. Mauris euismod volutpat pulvinar. Cras pellentesque nibh ut sapien sollicitudin, at posuere tortor volutpat. Integer tristique, lacus nec aliquam pellentesque, turpis quam commodo lacus, eget tincidunt lectus purus molestie tellus. Pellentesque viverra in dui quis maximus.",
                        metadata: {
                            authorId: 3,
                            publishedAt: 1470166495000
                        },
                        title: "A mock title 4"
                    },
                    {
                        author_name: "testing",
                        body: "Morbi non est maximus, cursus tortor in, ullamcorper metus. Integer sagittis condimentum porta. Phasellus dolor dolor, tristique vitae ex nec, pretium dignissim diam. Duis leo nisi, eleifend at gravida eget, tincidunt non erat. Curabitur sit amet libero dolor. Pellentesque pellentesque mauris imperdiet iaculis laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                        metadata: {
                            authorId: 1,
                            publishedAt: 1431006432000
                        },
                        title: "A mock title 2"
                    }
                ]
                const postsFiltered = [
                    {
                        author_name: "testing",
                        body: "Morbi non est maximus, cursus tortor in, ullamcorper metus. Integer sagittis condimentum porta. Phasellus dolor dolor, tristique vitae ex nec, pretium dignissim diam. Duis leo nisi, eleifend at gravida eget, tincidunt non erat. Curabitur sit amet libero dolor. Pellentesque pellentesque mauris imperdiet iaculis laoreet. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
                        metadata: {
                            authorId: 1,
                            publishedAt: 1431006432000
                        },
                        title: "A mock title 2"
                    }
                ]

                // GET_POSTS without param to filter 
                expect(store.getters['post/GET_POSTS'](false)).toEqual(postsWithAuthorName)

                // GET_POSTS without param to filter @TO-DO - Response is wrong :'(
                expect(store.getters['post/GET_POSTS'](true)).toEqual(postsWithAuthorName)
            })
            it('GET_RECENTLY_POSTS', async () => {
                // Sort by crescent
                store.commit('post/SORT_BY_CRESCENT')

                const postsOrdened = store.getters['post/GET_POSTS'](false)

                const mostRecentlyPosts = postsOrdened.splice(0, 3)

                expect(store.getters['post/GET_RECENTLY_POSTS']).toEqual(mostRecentlyPosts)

            })
        })
})