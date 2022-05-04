<template>
    <!-- Tentativa de criar um select com tipos variados -->
    <div @click.stop="open = !open" class="select-wrapper">
        <div class="sel" :class="{ active: open }">
            <div
                class="sel__wrapper"
                :class="{ selected: optionSelected !== '' }"
            >
                <label for="sel__input__sort-by" class="sel__label">
                    Select to sort
                </label>
                <span class="sel__selected">
                    {{ optionSelected }}
                </span>
            </div>
            <div class="sel__box">
                <input id="sel__input__sort-by" type="hidden" />
                <div v-for="(item, index) in items" :key="index">
                    <div
                        v-if="typeof item === 'object' && !Array.isArray(item)"
                        class="sel__box__options"
                        @click.stop="handleOption(item[itemValue])"
                        data-jest="select-array-object"
                    >
                        <span>{{ item[itemText] }}</span>
                    </div>
                    <div
                        v-else-if="
                            typeof item === 'object' && Array.isArray(item)
                        "
                        class="sel__box__options"
                        @click.stop="handleOption(item[0])"
                        data-jest="select-array-array"
                    >
                        <span>{{ item[0] }}</span>
                    </div>
                    <div
                        v-else-if="typeof item === 'string'"
                        class="sel__box__options"
                        @click.stop="handleOption(item)"
                        data-jest="select-array-string"
                    >
                        <span>{{ item }}</span>
                    </div>
                    <div
                        v-else
                        class="sel__box__options"
                        data-jest="select-array-invalid"
                    >
                        <span>TYPE INVALID</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import {
    computed,
    defineComponent,
    PropType,
    ref,
    WritableComputedRef,
} from 'vue';

export default defineComponent({
    name: 'SelectInput',
    emits: ['action', 'change-option'],
    props: {
        option: {
            type: String,
            default: '',
            required: true,
        },
        items: {
            type: Array as PropType<string | object>,
            default: () => [] as string | object[],
        },
        itemText: {
            type: String,
            default: '',
        },
        itemValue: {
            type: String,
            default: '',
        },
    },
    setup(props, { emit }) {
        const open = ref(false);
        const optionSelected: WritableComputedRef<string> = computed({
            get(): string {
                return props.option;
            },
            set(value: string) {
                emit('change-option', value);
            },
        });
        function handleOption(value: string) {
            optionSelected.value = value;
            open.value = !open.value;
            emit('action');
        }
        return {
            optionSelected,
            open,
            handleOption,
        };
    },
});
</script>

<style lang="scss" scoped>
@import '../../../src/common/styles/_variables.scss';
.select-wrapper {
    width: 100%;
}
.sel__wrapper {
    position: relative;
    display: inline-block;
}
.sel__wrapper.selected {
    .sel__label {
        display: none;
    }
}
.sel {
    cursor: pointer;
    border-bottom: 4px solid $white;
    background-color: transparent;
    display: inline-block;
    font-size: 1rem;
    padding-bottom: 10px;
    position: relative;
    z-index: 3;
    width: 100%;
    &::before {
        color: #fff;
        content: '\2935';
        font-weight: 900;
        font-size: 1.25rem;
        position: absolute;
        right: 20px;
    }
}

.sel.active {
    .sel__box {
        display: block;
        animation: fadeInUp 500ms;
    }
    .sel__label {
        visibility: hidden;
    }
    &::before {
        transition: all 0.5s ease-in-out;
        transform: rotateX(-180deg);
    }
}

.sel__input {
    background-color: transparent;
    border-style: none;
}

.sel__selected {
    color: $white;
    text-transform: capitalize;
}

.sel__label {
    display: inline-block;
    color: $white;
    text-align: left;
    pointer-events: none;
    user-select: none;
    visibility: visible;
}

.sel__box {
    background-color: $white;
    box-sizing: border-box;
    display: none;
    list-style-type: none;
    position: absolute;
    top: calc(100% + 4px);
    text-align: left;
    width: 100%;
    .sel__box__options {
        display: list-item;
        font-family: 'Quicksand';
        color: #020202;
        padding: 0.5em 1em;
        font-weight: 500;
        user-select: none;
        border-bottom: 1px solid black;
        &:hover {
            color: $white;
            background-color: #020202;
        }
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, -20px, 0);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
