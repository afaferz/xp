<template>
    <div class="posts__container">
        <div class="post-list post-list-recently__wrapper">
            <h4 class="post-type-title">Recently Posts</h4>
            <div v-if="isLoading" class="post-list__loading">
                <LoaderCustom />
            </div>
            <div class="post-list-recently__posts">
                <PostCard
                    v-for="post in recentlyPostList"
                    :key="post.metadata.id"
                    :post="post"
                    :show-preview="false"
                />
            </div>
        </div>
        <div class="post-list post-list__wrapper">
            <h4 class="post-type-title">All posts</h4>
            <div v-if="isLoading" class="post-list__loading">
                <LoaderCustom />
            </div>
            <div v-else class="post-list__cards">
                <TransitionGroup
                    @before-enter="onBeforeEnter"
                    @enter="onEnter"
                    @leave="onLeave"
                    tag="ul"
                    mode="fade"
                    :css="false"
                >
                    <li
                        v-for="(post, index) in postList"
                        :key="index"
                        data-jest="post-card__item"
                    >
                        <PostCard :post="post" :data-index="index" />
                    </li>
                    <li
                        v-show="postList.length === 0"
                        class="post-list__no-result"
                        :key="postList.length + 1"
                    >
                        No Results
                    </li>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import PostCard from './PostCard/PostCard.vue';
import LoaderCustom from '../Custom/LoaderCustom.vue';
import gsap from 'gsap';

export default defineComponent({
    name: 'PostList',
    components: { PostCard, LoaderCustom },
    setup() {
        const store = useStore();
        const postList = computed(() => store.getters['posts/GET_POSTS'](true));
        const recentlyPostList = computed(
            () => store.getters['posts/GET_RECENTLY_POSTS']
        );
        const isLoading = computed(() => store.state.posts.isLoading);
        function onBeforeEnter(el: {
            style: { opacity: number; height: number };
        }): void {
            el.style.opacity = 0;
            el.style.height = 0;
        }

        type DoneGsap = (...args: any[]) => void | null;

        function onEnter(el: { dataset: { index: number } }, done: DoneGsap) {
            gsap.to(el, {
                opacity: 1,
                height: 'auto',
                delay: el.dataset.index * 0.15,
                onComplete: done,
            });
        }

        function onLeave(el: { dataset: { index: number } }, done: DoneGsap) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                delay: el.dataset.index * 0.15,
                onComplete: done,
            });
        }

        return {
            postList,
            recentlyPostList,
            isLoading,
            onBeforeEnter,
            onEnter,
            onLeave,
        };
    },
});
</script>

<style lang="scss">
@import './PostList.module.scss';
.container {
    position: relative;
    padding: 0;
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}
</style>
