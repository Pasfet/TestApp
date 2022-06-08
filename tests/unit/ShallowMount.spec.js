
import { nextTick } from 'vue'
import { shallowMount, enableAutoDestroy } from '@vue/test-utils'
import TodoPage from "../../src/components/Mount/TodoPage.vue";
import TodoItem from "../../src/components/Mount/TodoItem.vue";

describe('ShallowMount components example', () => {
  enableAutoDestroy(beforeEach)
  let wrapper

  const renderParentComponent = () => {
    wrapper = shallowMount(TodoPage);
  };

  const renderItemComponent = (props) => {
    wrapper = shallowMount(TodoItem, {
      propsData: props
    });
  };

  const findButtonByText = text =>
    wrapper.findAll('button').wrappers.find(w => w.text() === text);

  const fetchResolve = (data) => jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data)
  }))

  const mockTodo = { id: 1, userId: 1, title: 'Title', completed: true }
  const mockFetchResponseWithOne = [mockTodo]

  describe('ParentComponent', () => {
    it('render TodoItem Component', async () => {
      const mockFetch = fetchResolve(mockFetchResponseWithOne)
      global.fetch = mockFetch
      renderParentComponent()

      // console.log(wrapper.html())
  
      const button = findButtonByText('load todo')
      await button.trigger('click');
  
      await nextTick()
      await nextTick()
  
      // console.log(wrapper.html())
      expect(wrapper.findComponent(TodoItem).exists()).toBe(true)
    })

    // failed
    it.skip('delete todo item if click on X', async () => {
      const mockFetch = fetchResolve(mockFetchResponseWithOne)
      global.fetch = mockFetch
      renderParentComponent()

      console.log(wrapper.text())

      const buttonLoad = findButtonByText('load todo')
      await buttonLoad.trigger('click')

      await nextTick()
      await nextTick()

      // console.log(wrapper.html())
      const buttonDelete = findButtonByText('X')
      buttonDelete.trigger('click')
      
      await nextTick()
      //  console.log(wrapper.html())
      
      expect(wrapper.text()).toContain('Total count 2')
      expect(wrapper.text()).not.toContain('UserId: 1')
    })

    it('delete todo when todoItem emitted event delete with id', async () => {
      const mockFetch = fetchResolve(mockFetchResponseWithOne)
      global.fetch = mockFetch
      renderParentComponent()

      const button = findButtonByText('load todo')
      await button.trigger('click');
  
      await nextTick()
      await nextTick()

      expect(wrapper.text()).toContain('Total count 1')
      // console.log(wrapper.html())
      const todoItem = wrapper.findComponent(TodoItem)
      todoItem.vm.$emit('delete', 1)

      // console.log(todoItem.emitted())

      // expect(todoItem.emitted().delete).toEqual([[1]])
      expect(todoItem.emitted('delete')).toEqual([[1]])

      await nextTick()
      
      // console.log(wrapper.html())
      expect(wrapper.text()).toContain('Total count 0')
    })
  })

  describe('TodoItem component', () => {
    it.skip('render todo', () => {
      renderItemComponent({ todo: mockTodo })

      // console.log(wrapper.props())

      // console.log(wrapper.html())
      expect(wrapper.text()).toContain('Title')
      expect(wrapper.text()).toContain('UserId: 1')
    })
  })

})