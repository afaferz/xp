import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils'
import SelectInput from '@/components/Custom/SelectInput.vue'

describe('Testing SelecInput Component', () => {
    let wrapper: VueWrapper<any>;
    let selectOptionObject: DOMWrapper<Element>[];
    let selectOptionString: DOMWrapper<Element>[];
    let selectOptionArray: DOMWrapper<Element>[];

    function setWrapperElement() {
        selectOptionObject = wrapper.findAll('[data-jest="select-array-object"]')
        selectOptionString = wrapper.findAll('[data-jest="select-array-string"]')
        selectOptionArray = wrapper.findAll('[data-jest="select-array-array"]')
    }
    function resetWrapperElement() {
        selectOptionObject = []
        selectOptionString = []
        selectOptionArray = []
    }
    beforeAll(async () => {
        wrapper = mount(SelectInput, {
            props: {
                option: ''
            }
        })
        // Open List
        const listWrapper = wrapper.find('.select-wrapper')
        await listWrapper.trigger('click')
    })
    afterEach(() => {
        resetWrapperElement()
    })
    it('Test mount component', async () => {
        expect(wrapper.vm).toBeTruthy()
    })
    it('Props default', async () => {
        expect(wrapper.props().option).toEqual("")
        expect(wrapper.props().items).toEqual([])
        expect(wrapper.props().itemText).toEqual("")
        expect(wrapper.props().itemValue).toEqual("")
    })
    it('Testing open list', async () => {
        expect(wrapper.vm.open).toBeTruthy()
    })
    it('Testing items with string array', async () => {
        const propsMock = ['crescent', 'decrescent']
        await wrapper.setProps({ items: propsMock })
        setWrapperElement()

        // Cant render first conditional
        expect(selectOptionObject).toEqual([])
        expect(selectOptionArray).toEqual([])

        expect(selectOptionString[0].exists()).toBeTruthy()
        expect(selectOptionString[1].exists()).toBeTruthy()

        expect(selectOptionString[0].text()).toEqual('crescent')
        expect(selectOptionString[1].text()).toEqual('decrescent')

        // Testing trigger option
        await selectOptionString[0].trigger('click')
        expect(wrapper.emitted('change-option')).toBeTruthy()
        expect(wrapper.emitted('action')).toBeTruthy()

        await selectOptionString[1].trigger('click')
        expect(wrapper.emitted('change-option')).toBeTruthy()
        expect(wrapper.emitted('action')).toBeTruthy()
    })
    it('Testing items with array string array', async () => {
        const propsMock = [['crescent'], ['decrescent']]
        await wrapper.setProps({ items: propsMock })
        setWrapperElement()

        expect(selectOptionObject).toEqual([])
        expect(selectOptionString).toEqual([])


        expect(selectOptionArray[0].exists()).toBeTruthy()
        expect(selectOptionArray[1].exists()).toBeTruthy()

        expect(selectOptionArray[0].text()).toEqual('crescent')
        expect(selectOptionArray[1].text()).toEqual('decrescent')

        // Testing trigger option
        await selectOptionArray[0].trigger('click')
        expect(wrapper.emitted('change-option')).toBeTruthy()
        expect(wrapper.emitted('action')).toBeTruthy()

        await selectOptionArray[1].trigger('click')
        expect(wrapper.emitted('change-option')).toBeTruthy()
        expect(wrapper.emitted('action')).toBeTruthy()
    })
    it('Testing items with object', async () => {
        const initialOpenValue = wrapper.vm.open
        const propsMock = [
            {
                label: 'CRESCENT',
                value: 'crescent',
            },
            {
                label: 'DECRESCENT',
                value: 'decrescent',
            }
        ]
        await wrapper.setProps({ items: propsMock, itemText: 'label', itemValue: 'value' })
        setWrapperElement()


        expect(wrapper.props().itemText).toEqual('label')
        expect(wrapper.props().itemValue).toEqual('value')


        expect(selectOptionString).toEqual([])
        expect(selectOptionArray).toEqual([])

        expect(selectOptionObject[0].exists()).toBeTruthy()
        expect(selectOptionObject[1].exists()).toBeTruthy()

        expect(selectOptionObject[0].text()).toEqual('CRESCENT')
        expect(selectOptionObject[1].text()).toEqual('DECRESCENT')

        // Testing trigger option
        await selectOptionObject[0].trigger('click')
        expect(wrapper.emitted('action')).toBeTruthy() // Sort by
        expect(wrapper.emitted('change-option')).toBeTruthy() // Change Option value
        expect(wrapper.vm.open).toEqual(!initialOpenValue) // Close list

        await selectOptionObject[1].trigger('click')
        expect(wrapper.emitted('action')).toBeTruthy() // Sort by
        expect(wrapper.emitted('change-option')).toBeTruthy() // Change Option value
        expect(wrapper.vm.open).toEqual(initialOpenValue) // Close list
    })
    it('Testing items with object without item-value and item-text', async () => {
        const propsMock = [
            {
                label: 'CRESCENT',
                value: 'crescent',
            },
            {
                label: 'DECRESCENT',
                value: 'decrescent',
            }
        ]
        await wrapper.setProps({ items: propsMock, itemText: '', itemValue: '' })
        setWrapperElement()

        // Cant render second conditional
        expect(selectOptionString).toEqual([])
        expect(selectOptionArray).toEqual([])

        expect(selectOptionObject[0].exists()).toBeTruthy()
        expect(selectOptionObject[1].exists()).toBeTruthy()

        expect(selectOptionObject[0].text()).toEqual('')
        expect(selectOptionObject[1].text()).toEqual('')

        // Testing trigger option
        await selectOptionObject[0].trigger('click')
        expect(wrapper.emitted('action')).toBeTruthy()
        expect(wrapper.emitted('change-option')).toBeTruthy()

        await selectOptionObject[1].trigger('click')
        expect(wrapper.emitted('action')).toBeTruthy()
        expect(wrapper.emitted('change-option')).toBeTruthy()

    })
    it('Testing items with invalid value', async () => {
        const propsMock: any[] = [undefined, undefined]
        await wrapper.setProps({ items: propsMock })
        const itemsWhenInvalidValue = wrapper.findAll('[data-jest="select-array-invalid"]')

        expect(selectOptionString).toEqual([])
        expect(selectOptionObject).toEqual([])
        expect(selectOptionArray).toEqual([])

        expect(itemsWhenInvalidValue[0].exists()).toBeTruthy()
        expect(itemsWhenInvalidValue[1].exists()).toBeTruthy()

        expect(itemsWhenInvalidValue[0].text()).toEqual('TYPE INVALID')
        expect(itemsWhenInvalidValue[1].text()).toEqual('TYPE INVALID')
    })
})
