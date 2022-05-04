<template>
    <NotFound />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotFound from "../components/Custom/NotFound.vue";

export default defineComponent({
    name: "NotFoundPage",
    components: {
        NotFound,
    },
    setup() {},
});
</script>

<style lang="scss" scoped>
</style>
