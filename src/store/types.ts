import { DispatchOptions } from "vuex/types";
import { Getters as PostGettersType } from "./modules/posts/getters";
import { Actions as PostActionsType } from "./modules/posts/actions";

export interface StoreActions
    extends PostActionsType { }

export interface StoreGetters
    extends PostGettersType { }

export type CustomDispatch = {
    dispatch<K extends keyof StoreActions>(
        key: K,
        payload?: Parameters<StoreActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<StoreActions[K]>;
};

export type CustomRootGetter = {
    rootGetters: {
        [K in keyof StoreGetters]: ReturnType<StoreGetters[K]>;
    };
};