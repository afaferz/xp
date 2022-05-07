<template>
    <div class="single-post__container">
        <router-link :to="{ name: 'home' }" class="single-post__link__posts">
            See all posts
        </router-link>
        <div class="single-post__wrapper">
            <h4 class="single-post__title">{{ title }}</h4>
            <div class="single-post__metadata">
                <span class="single-post__metadata__date">
                    Published At |
                    <em>
                        {{ $filters.formatDate(metadata.publishedAt) }}
                    </em>
                </span>
                <span class="single-post__metadata__authorname">
                    By |
                    <em>
                        {{ author_name }}
                    </em>
                </span>
            </div>
            <p class="single-post__content" v-text="body"></p>
        </div>
    </div>
</template>

<script lang="ts">
import {
    computed,
    defineComponent,
    onMounted,
    onUpdated,
    reactive,
    toRefs,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { IPostWithAuthorName } from "@/store/modules/posts/interfaces";

export default defineComponent({
    name: "SinglePost",
    setup() {
        const route = useRoute();
        const store = useStore();
        const postname = route.params.postname;

        const postList = computed<IPostWithAuthorName[]>(() =>
            store.getters["posts/GET_POSTS"](false)
        );

        const singlePost = reactive<IPostWithAuthorName>({
            title: "",
            author_name: "",
            body: "",
            metadata: {
                publishedAt: 0,
                authorId: null,
            },
        });

        // Verify if have a post setted in store
        onMounted(async () => {
            if (postList.value.length === 0) {
                // Ensures there will be posts when the page reloads
                try {
                    const storeCalls = [
                        store.dispatch("posts/GET_AUTHORS"),
                        store.dispatch("posts/GET_POSTS"),
                    ];
                    await Promise.all(storeCalls);
                } catch (error) {
                    console.log(error);
                }
            }
            const post = postList.value.find(
                ({ title }: IPostWithAuthorName) => {
                    const postTitleNormalizated = title
                        .toLowerCase()
                        .replace(/[^A-Z0-9]/gi, "-");

                    return postname === postTitleNormalizated;
                }
            );

            // Prevent error if post is undefined
            if (post) {
                singlePost.title = post.title;
                singlePost.author_name = post.author_name;
                singlePost.body = post.body;
                singlePost.metadata = post.metadata;
            }
        });

        return {
            ...toRefs(singlePost),
        };
    },
});
</script>

<style lang="scss" scoped>
@import "./SinglePost.module.scss";
</style>
