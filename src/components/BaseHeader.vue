<template>
    <header class="main-header" :class="{ 'bg--black': !isHome }" ref="header">
        <div class="main-header__logo">
            <img
                v-if="isHome"
                src="../common/img/xp-logo-clean-black.png"
                alt="XP Logo"
            />
            <img
                v-else
                src="../common/img/xp-logo-clean-white.png"
                alt="XP Logo"
            />
        </div>
        <h1>A Blog</h1>
    </header>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { debounce } from "@/common/helpers/debounce";

export default defineComponent({
    name: "BaseHeader",
    setup(_props) {
        const route = useRoute();
        const header = ref(null);
        const isHome = route.path === "/";

        const shrinkHeader = () => {
            const scrollY = 50;
            if (!header.value) return;
            if (scrollY < window.scrollY) {
                header.value.classList.add("shrink");
            } else {
                header.value.classList.remove("shrink");
            }
        };
        onMounted(() => {
            window.addEventListener("scroll", debounce(shrinkHeader, 500));
        });

        return {
            header,
            shrinkHeader,
            isHome,
        };
    },
});
</script>
<style lang="scss" scoped>
@import "@/common/styles/_variables.scss";
.main-header {
    height: 90px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    background-color: #fefefe;
    transition: all 0.4s ease-in-out;
    &.bg--black {
        background-color: #020202;
        color: $white;
        box-shadow: $shadow;
    }

    h1 {
        font-size: 4rem;
    }

    .main-header__logo {
        width: 6rem;
        height: 6rem;
        margin-right: 1.45rem;
        transition: all 0.4s ease-in-out;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }

    &.shrink {
        height: 55px;

        .main-header__logo {
            width: 4.5rem;
            height: 4.5rem;
            margin-right: 1.45rem;
            img {
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
