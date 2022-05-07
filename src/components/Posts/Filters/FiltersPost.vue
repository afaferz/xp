<template>
    <div class="filter-post__wrapper">
        <div class="filter-group filter-post__text">
            <label class="filter-label" for="filter-by">Filter By Author</label>
            <input
                id="filter-by"
                type="text"
                class="filter-post__filter-by"
                @click="activeInput = true"
                v-model.trim="filterByAuthorName"
            />
        </div>
        <div class="filter-group filter-post__select">
            <SelectInput
                :option="option"
                :items="sortByOptions"
                @change-option="option = $event"
                @action="selectSortBy"
                item-text="label"
                item-value="value"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, WritableComputedRef } from 'vue';
import { useStore } from 'vuex';
import SelectInput from '@/components/Custom/SelectInput.vue';

export default defineComponent({
    name: 'FiltersPosts',
    components: {
        SelectInput,
    },
    setup() {
        const store = useStore();
        const sortByCrescent = () => store.commit('posts/SORT_BY_CRESCENT');
        const sortByDecrescent = () => store.commit('posts/SORT_BY_DECRESCENT');
        const filterByAuthorName: WritableComputedRef<string> = computed({
            get(): string {
                return store.getters['posts/FILTERS'].author;
            },
            set(value: string) {
                store.commit('posts/SET_FILTERS', {
                    author: value,
                });
            },
        });

        const option = ref('');
        const sortByOptions = [
            {
                label: 'CRESCENT',
                value: 'crescent',
            },
            {
                label: 'DECRESCENT',
                value: 'decrescent',
            },
        ];

        function selectSortBy() {
            if (option.value === 'crescent') return sortByCrescent();
            if (option.value === 'decrescent') return sortByDecrescent();
        }

        return {
            selectSortBy,
            option,
            sortByOptions,
            filterByAuthorName,
        };
    },
});
</script>

<style lang="scss" scoped>
@import './FiltersPost.module.scss';
.filter-post__select {
    position: relative;
    cursor: pointer;
}
.filter-post__sort-by {
    display: none;
}
</style>
