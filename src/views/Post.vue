<template>
    <BaseHeader />

    <SiglePost />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseHeader from '../components/BaseHeader.vue';
import SiglePost from '../components/Posts/SinglePost.vue';

export default defineComponent({
    components: {
        BaseHeader,
        SiglePost,
    },
});
</script>
