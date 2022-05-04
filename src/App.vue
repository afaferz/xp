<template>
    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition name="fade" appear mode="in-out">
                <!-- <KeepAlive> -->
                    <Suspense>
                        <!-- Routers View -->
                        <component :is="Component"></component>
                        <!-- Page Loader -->
                        <template #fallback>
                            <PageLoader />
                        </template>
                    </Suspense>
                <!-- </KeepAlive> -->
            </Transition>
        </template>
    </RouterView>
</template>

<script lang="ts">
import PageLoader from '../src/components/Custom/PageLoader/PageLoader.vue';
import { defineComponent } from 'vue';

// Check if page document is ready
document.onreadystatechange = () => {
    if (document.readyState == 'complete') {
        document.body.classList.remove('bg--black');
    } else {
        document.body.classList.add('bg--black');
    }
};

export default defineComponent({
    components: {
        PageLoader,
    },
});
</script>

<style lang="scss">
@import './common/styles/reset';
body {
    background-color: #fefefe;
    color: #020202;
    &.bg--black {
        background-color: #020202;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
