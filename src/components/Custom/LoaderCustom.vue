<template>
    <span class="loader-title">Loading...</span>
    <div class="loader-wrapper">
        <div class="loader-spinner spiral"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'LoaderCustom',
    setup() {},
});
</script>

<style lang="scss" scoped>
@import '../../../src/common/styles/_variables.scss';

/* ------ Animation Spiral ------ */
// Variables
$size: 2.5rem;
$spiral-circle-size: 7px;
$circle-small-size: 30%;
$circle-medium-size: 65%;
$animation-duration: 1.5s;
$degree-rotation: 360deg;

@mixin base {
    -webkit-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
}

@mixin animate {
    -webkit-transform: rotate(-$degree-rotation);
    -ms-transform: rotate(-$degree-rotation);
    -o-transform: rotate(-$degree-rotation);
    transform: rotate(-$degree-rotation);
}

.loader-wrapper {
    height: $size;
    margin-top: 10px;
}

.loader-spinner {
    border-radius: 50%;
    height: $size;
    width: $size;
    position: relative;
    border: $spiral-circle-size solid transparent;
    border-bottom: $spiral-circle-size solid $primary;
    border-radius: 50%;

    &::before,
    &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        border: $spiral-circle-size solid transparent;
        margin: auto;
        left: 0;
        right: 0;
        bottom: 0;
    }

    &::before {
        border-bottom: $spiral-circle-size solid $tertiary;
        height: $circle-small-size;
        top: -15px;
        width: $circle-small-size;
    }

    &::after {
        border-bottom: $spiral-circle-size solid $secondary;
        height: $circle-medium-size;
        top: -7px;
        width: $circle-medium-size;
    }
}

@keyframes animateCenter {
    0%,
    25% {
        @include base;
    }
    100% {
        @include animate;
    }
}

@keyframes animateMain {
    0% {
        @include base;
    }
    100% {
        @include animate;
    }
}

.spiral {
    animation: animateMain ease $animation-duration infinite;

    &::after {
        animation: animateMain ease $animation-duration infinite;
    }

    &::before {
        animation: animateCenter ease $animation-duration infinite;
    }
}
/* ------ Animation Spiral - End ------ */
.loader-title {
    color: $disabled;
    font-size: .95rem;
    font-weight: normal;
}
</style>
