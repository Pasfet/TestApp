import { mount, shallowMount, enableAutoDestroy } from '@vue/test-utils'
import WithSlots from "../../src/components/Slots/WithSlots.vue";
import TodoPage from "../../src/components/Mount/TodoPage.vue";


describe('ShallowMount components example', () => {
  enableAutoDestroy(beforeEach)
  let wrapper

  const renderMount = (component) => {
   wrapper = mount(component)
  }
  const renderShallow = (component, option) => {
    wrapper = shallowMount(component, option)
  }

  const mockTodo = { id: 1, userId: 1, title: 'Title', completed: true }


  it.skip('render Parent', () => {
    // renderMount(TodoPage)
    // renderShallow(TodoPage)

    console.log(wrapper.html())
  })

  it('render Current', () => {
    // renderMount(WithSlots)
    renderShallow(WithSlots, {
      slots: {
        default: '<div>Fooo</div>',
        warning: mockTodo.title,
      },
    })

    console.log(wrapper.html())
  })

  it.skip('stubs', () => {
    renderShallow(TodoPage, {
      stubs: {
        WithSlots
      }
    })

    console.log(wrapper.html())
  })
})