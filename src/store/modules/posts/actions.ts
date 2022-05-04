import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionsTypes } from './actions-type'
import { MutationsTypes } from './mutations-type'
import { IPost, IPostWithAuthorName } from './interfaces'
import api from '../../../common/api/api'

type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>, 'commit'>

export interface Actions {
    [ActionsTypes.GET_POSTS](
        { commit }: AugmentedActionContext,
        payload: IPost
    ): void
    [ActionsTypes.GET_AUTHORS](
        { commit }: AugmentedActionContext,
        payload: IPost
    ): void
}

export const actions: ActionTree<State, State> & Actions = {
    async [ActionsTypes.GET_POSTS]({ commit }) {
        try {
            const { data } = await api.get('5be5e3fa2f000082000fc3f8')
            commit(MutationsTypes.SET_POSTS, data)
        } catch (error) {

        }
    },
    async [ActionsTypes.GET_AUTHORS]({ commit }) {
        try {
            const { data } = await api.get('5be5e3ae2f00005b000fc3f6')
            commit(MutationsTypes.SET_AUTHORS, data)
        } catch (error) {

        }
    }
}