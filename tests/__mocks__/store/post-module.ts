import { getters } from '../../../src/store/modules/posts/getters'
import { State, state } from '../../../src/store/modules/posts/state'
import { mutations } from '../../../src/store/modules/posts/mutations'
import { actions } from '../../../src/store/modules/posts/actions'

export const postModuleWithData = {
    namespaced: true,
    state: {
        posts: [
            {
                title: 'A mock post',
                body: 'Lorem ipsum',
                metadata: {
                    id: 1,
                    publishedAt: 1492004832000,
                    authorId: 1,
                },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 2',
                body: 'Lorem ipsum',
                metadata: {
                    id: 2,
                    publishedAt: 1431006432000,
                    authorId: 2,
                },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 3',
                body: 'Lorem ipsum',
                metadata: {
                    id: 3,
                    publishedAt: 1490010372000,
                    authorId: 1,
                },
                author_name: 'Mock Author'
            },
            {
                title: 'A mock post 4',
                body: 'Lorem ipsum',
                metadata: {
                    id: 4,
                    publishedAt: 1470166495000,
                    authorId: 3,
                },
                author_name: 'Mock Author'
            }
        ],
        authors: [
            {
                name: 'Mock Author',
                id: 1,
            },
            {
                name: 'Mock Author 2',
                id: 2,
            },
            {
                name: 'Mock Author 3',
                id: 3,
            }
        ],
        filters: {
            author: ''
        },
        isLoading: false,
    },
    mutations,
    actions: actions,
    getters: getters,
}

export const postModuleWithoutData = {
    namespaced: true,
    state: {
        isLoading: false,
        posts: [],
        authors: [
            {
                name: 'Mock Author',
                id: 1,
            },
            {
                name: 'Mock Author 2',
                id: 2,
            },
            {
                name: 'Mock Author 3',
                id: 3,
            }
        ],
        filters: {
            author: 'Mock Author'
        }
    } as State,
    mutations,
    actions,
    getters: {
        'GET_POSTS': (state: State) => (filter: boolean): [] => ([])
    },
}