import { Module } from "vuex";
import { State, state } from "./state";
import { mutations } from "./mutations";
import { actions } from "./actions";
import { getters } from "./getters";

const posts: Module<State, any> = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}

export default posts