<template>
    <div class="post-card">
        <div class="post-card__title">
            <h3>
                {{ post.title }}
            </h3>
        </div>
        <hr class="post-card__divisor" />
        <p v-if="showPreview" class="post-card__preview">{{ post.body }}</p>
        <button
            class="post-card__button"
            @click="redirectToPost(post.title)"
            aria-label="READ MORE"
        />
        <div class="post-card__metadata">
            <span class="post-card__metadata__author">
                By
                <em>
                    {{ post.author_name }}
                </em>
            </span>
            <span class="post-card__metadata__date">
                Published At |
                <em>
                    {{ $filters.formatDate(post.metadata.publishedAt) }}
                </em>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { IPost } from '@/store/modules/posts/interfaces';

export default defineComponent({
    name: 'PostCard',
    props: {
        post: {
            type: Object as PropType<IPost>,
            default: () => ({
                title: '',
                body: '',
                metadata: {
                    publishedAt: 0,
                    authorId: 0,
                },
                author_name: '',
            }),
        },
        showPreview: {
            type: Boolean,
            default: true,
        },
    },
    setup() {
        const router = useRouter();

        function redirectToPost(postName: string) {
            const postname = postName.toLowerCase().replace(/[^A-Z0-9]/gi, '-');
            router.push({
                name: 'post-postname',
                params: {
                    postname,
                },
            });
        }
        return {
            redirectToPost,
        };
    },
});
</script>

<style lang="scss">
@import './PostCard.module';
</style>
