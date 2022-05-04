import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createStore } from 'vuex'
import FiltersPost from '../../../src/components/Posts/Filters/FiltersPost.vue'
import { postModuleWithData } from '../../__mocks__/store/post-module'

const storePost = createStore({
    modules: {
        posts: postModuleWithData
    },
})


describe('Test component FiltersPost', () => {
    let wrapper: VueWrapper<any>;
    const spyOnStoreCommit = jest.spyOn(storePost, 'commit')
    beforeAll(() => {
        wrapper = mount(FiltersPost, {
            global: {
                plugins: [storePost],
                stubs: ['SelectInput']
            },
        })
    })
    it('Component was render', () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Default sort by', async () => {
        const option = wrapper.vm.option

        expect(option).toEqual('')
    })
    it('Filter by author input', async () => {
        const inputAuthorName = wrapper.find('.filter-post__filter-by')

        expect(wrapper.vm.filterByAuthorName).toEqual('')

        await inputAuthorName.setValue('nicholas')

        expect(spyOnStoreCommit).toHaveBeenCalled()
        expect(spyOnStoreCommit).toHaveBeenCalledWith(
            "posts/SET_FILTERS", { author: "nicholas" }
        )
        expect(wrapper.vm.filterByAuthorName).toEqual('nicholas')
    })
    it('Sort by selected by crescent', async () => {
        wrapper.vm.option = 'crescent'

        // Active function without emit
        wrapper.vm.selectSortBy()
        expect(wrapper.vm.option).toEqual('crescent')

        expect(spyOnStoreCommit).toHaveBeenCalledTimes(2)
        expect(spyOnStoreCommit).toHaveBeenCalledWith('posts/SORT_BY_CRESCENT')
    })
    it('Sort by selected by decrescent', async () => {
        wrapper.vm.option = 'decrescent'

        // Active function without emit
        wrapper.vm.selectSortBy()

        expect(wrapper.vm.option).toEqual('decrescent')

        expect(spyOnStoreCommit).toHaveBeenCalledTimes(3)
        expect(spyOnStoreCommit).toHaveBeenCalledWith('posts/SORT_BY_DECRESCENT')
    })
})