import { GetterTree } from 'vuex'
import { State } from './state'
import { IPost, IPostWithAuthorName } from './interfaces'
import { GettersTypes } from './getters-type'

export type Getters = {
    [GettersTypes.GET_POSTS]: (state?: State) => (filter: boolean) => IPostWithAuthorName[];
    // Tipagem para getters não consegui fazer :'(
    [GettersTypes.GET_RECENTLY_POSTS]: (state: State, getters: any) => IPostWithAuthorName[];
}

export const getters: GetterTree<State, State> & Getters = {
    [GettersTypes.GET_POSTS]: (state) => (filter = false) => {
        // Create a type of Post with Authors names
        const postWithAuthor = []
        for (const post of state.posts) {
            let samplePost = { ...post } as IPostWithAuthorName
            const author = state.authors.find(({ id }) => post.metadata.authorId === id)
            if (author) {
                samplePost = { ...post, author_name: author.name }
            }
            postWithAuthor.push(samplePost)
        }
        // Return all post if it not in filter
        if (!filter) {
            return postWithAuthor
        }

        const authorName = state.filters.author.toLowerCase()

        return postWithAuthor.filter(({ author_name }) => {
            const postAuthorName = author_name.toLowerCase()

            return postAuthorName.indexOf(authorName) != -1
        })

    },
    [GettersTypes.GET_RECENTLY_POSTS]: (state, getters) => {
        const allPosts = getters[GettersTypes.GET_POSTS](false)
        const postOrdenedByTime = allPosts.sort((postA: IPost, postB: IPost) => {
            const { metadata: metaDataPostA } = postA
            const { metadata: metaDataPostB } = postB
            return metaDataPostB.publishedAt - metaDataPostA.publishedAt
        })
        const threeMostRecentlyPosts = postOrdenedByTime.splice(0, 3)
        return threeMostRecentlyPosts
    },
    [GettersTypes.FILTERS]: (state) => {
        return state.filters
    }
}
