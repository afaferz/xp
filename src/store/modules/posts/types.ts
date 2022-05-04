import { State } from "./state";
import { Getters } from "./getters";
import { Mutations } from "./mutations";
import { Actions } from "./actions";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type PostsStoreModuleTypes<S = State> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
> & {
    commit<
        K extends keyof Mutations,
        P extends Parameters<Mutations[K]>[1]
    >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<Mutations[K]>;
} & {
    getters: {
        [K in keyof Getters]: ReturnType<Getters[K]>;
    };
} & {
    dispatch<K extends keyof Mutations>(
        key: K,
        payload?: Parameters<Mutations[K]>[1],
        options?: DispatchOptions
    ): ReturnType<Mutations[K]>;
};