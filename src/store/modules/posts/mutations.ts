import { MutationsTypes } from "./mutations-type"
import { MutationTree } from 'vuex'
import { State } from "./state"
import { IPost, IAuthor } from "./interfaces"

export type Mutations<S = State> = {
    [MutationsTypes.SET_POSTS](state: S, payload: IPost[]): void
    [MutationsTypes.SET_AUTHORS](state: S, payload: IAuthor[]): void
    [MutationsTypes.SORT_BY_DECRESCENT](state: S): void
    [MutationsTypes.SORT_BY_CRESCENT](state: S): void
    [MutationsTypes.SET_FILTERS](state: S, payload: { author: string }): void
    [MutationsTypes.SET_LOADING](state: S, payload: boolean): void
}

export const mutations: MutationTree<State> & Mutations = {
    [MutationsTypes.SET_POSTS](state, payload: IPost[]) {
        state.posts = payload
    },
    [MutationsTypes.SET_AUTHORS](state, payload: IAuthor[]) {
        state.authors = payload
    },
    [MutationsTypes.SORT_BY_DECRESCENT](state) {
        state.posts = state.posts.sort((postA: IPost, postB: IPost) => {
            const { metadata: metaDataPostA } = postA
            const { metadata: metaDataPostB } = postB
            return metaDataPostA.publishedAt - metaDataPostB.publishedAt
        })
    },
    [MutationsTypes.SORT_BY_CRESCENT](state) {
        state.posts = state.posts.sort((postA: IPost, postB: IPost) => {
            const { metadata: metaDataPostA } = postA
            const { metadata: metaDataPostB } = postB
            return metaDataPostB.publishedAt - metaDataPostA.publishedAt
        })
    },
    [MutationsTypes.SET_FILTERS](state, payload: { author: string }) {
        state.filters = payload
    },
    [MutationsTypes.SET_LOADING](state, payload) {
        state.isLoading = payload
    }
}