// import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore } from 'vuex'
import { PostsStoreModuleTypes } from './modules/posts/types'

// Modules
import postsStore from './modules/posts'

type StoreModules = {
    posts: PostsStoreModuleTypes
}

export interface State {
    count: number,
}

export type Store = PostsStoreModuleTypes<Pick<StoreModules, "posts">>

// define injection key
// export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
    state: {
        count: 0,
    },
    modules: {
        posts: postsStore
    }
})

export function useStore(): Store {
    return baseUseStore() as Store
}


