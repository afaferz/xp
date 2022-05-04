<template class="test">
    <div>
        <BaseHeader />
        <FiltersPost />
        <PostList />
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import PostList from '../components/Posts/PostList.vue';
import BaseHeader from '../components/BaseHeader.vue';
import FiltersPost from '../components/Posts/Filters/FiltersPost.vue';

export default {
    components: { PostList, FiltersPost, BaseHeader },
    async setup() {
        const store = useStore();
        store.commit('posts/SET_LOADING', true);
        try {
            // Call the store actions to get first author and then posts
            const storeCalls = [
                store.dispatch('posts/GET_AUTHORS'),
                store.dispatch('posts/GET_POSTS'),
            ];
            await Promise.all(storeCalls);
            // await store.dispatch('posts/GET_AUTHORS');
            // await store.dispatch('posts/GET_POSTS');
        } catch (error) {
            console.log(error);
        } finally {
            store.commit('posts/SET_LOADING', false);
        }
    },
};
</script>
