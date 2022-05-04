<template>
    <div class="page-loader-wrapper">
        <div class="page-loader__container">
            <img
                src="../../../common/img/xp-logo.png"
                class="page-loader__logo"
                alt="XP Logo"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PageLoader',
    setup() {},
});
</script>
<style lang="scss" scoped>
@import '../../../common/styles/breakpoints.scss';
.page-loader-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    height: 100vh;
    background-color: #020202;
    width: 100%;
}

.page-loader__container {
    box-sizing: border-box;
    height: 50%;
    position: relative;
    left: 50%;
    transform: translate(-50%, -50%);

    top: 50%;
    width: 100%;
    @include viewport('laptop') {
        width: 60%;
        height: 60%;
    }
}
.page-loader__logo {
    animation: blink 1s infinite;
    display: block;
    width: 100%;
    height: 100%;
}
@keyframes blink {
    0% {
        opacity: 1;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
