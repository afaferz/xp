<template>
    <div class="not-found__wrapper">
        <div class="not-found__container">
            <span class="not-found__title"> 404 </span>
            <p class="not-found__subtitle">
                Nothing to see here.
                <br />
                This page is not found!
            </p>
            <router-link :to="{ name: 'home' }" class="not-found__link__home">
                GO HOME
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "NotFound",
    setup() {},
});
</script>

<style lang="scss" scoped>
@import "../../../src/common/styles/_variables.scss";
@import "../../../src/common/styles/breakpoints.scss";
.not-found__wrapper {
    align-items: center;
    background-color: #020200;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    width: 100vw;
}
.not-found__container {
    display: flex;
    flex-direction: column;
    height: 70%;
    justify-content: space-between;
    text-align: center;
    width: 70%;
}
.not-found__title {
    text-align: center;
    font-size: 6rem;
    color: $white;
    text-shadow: 0 1px 0 #cccccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
        0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
        0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
        0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
        0 20px 20px rgba(0, 0, 0, 0.15);
    font-weight: 900;
    letter-spacing: 1.4rem;
    @include viewport("laptop") {
        font-size: 15rem;
    }
}
.not-found__subtitle {
    color: $secondary;
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 1.75;
}
.not-found__link__home {
    align-items: center;
    all: unset;
    background: $white;
    border: 2px solid #020200;
    cursor: pointer;
    font-weight: 900;
    height: 25px;
    margin: 1rem auto;
    padding: 1.2rem;
    text-decoration: none;
    transition: all 0.35s ease-in-out;
    width: 200px;
    &:active {
        color: $white;
    }
    &:hover {
        background-color: #020200;
        color: $white;
        border: 2px solid $white;
    }
}
</style>
