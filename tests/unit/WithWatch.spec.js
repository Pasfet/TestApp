import { shallowMount, enableAutoDestroy } from '@vue/test-utils'
import WithWatch from "../../src/components/Watch/WithWatch.vue";

describe('WithWatch example', () => {
  enableAutoDestroy(beforeEach)
  let wrapper

  const renderShallow = (component, option) => {
    wrapper = shallowMount(component, option)
  }

  it.skip('render', async () => {
    renderShallow(WithWatch, {
      propsData: {
        group: 0
      }
    })

    // console.log(wrapper.html())
    expect(wrapper.text()).toContain('Default')

    await wrapper.setProps({ group: 1})

    // console.log(wrapper.html())
    expect(wrapper.text()).toContain('Title 1')
  })

  it.skip.each`
    id | text
    ${1} | ${'Title 1'}
    ${2} | ${'Title 2'}
    ${3} | ${'id props'}
  `('render $text when group props = $group', async ({ id, text }) => {
      renderShallow(WithWatch, {
        propsData: {
          id,
          group: 1,
        }
      })

      // console.log(wrapper.html())
      expect(wrapper.text()).toContain(text)
  })

  it.todo('sadas')
  it.todo('sadas')
})