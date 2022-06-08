import { nextTick } from 'vue'
import { mount, enableAutoDestroy } from "@vue/test-utils";
import TodoPage from "../../src/components/Mount/TodoPage.vue";

describe("Mount component example", () => {
  enableAutoDestroy(beforeEach)
  let wrapper

  const renderComponent = () => {
    wrapper = mount(TodoPage);
  };

  const findButtonByText = text =>
    wrapper.findAll('button').wrappers.find(w => w.text() === text);

  const fetchResolve = (data) => jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(data)
  }))

  const mockFetchResponseWithOne = [{ id: 1, userId: 1, title: 'Title', completed: true }]
  const mockFetchResponseWithThird = [
    { id: 1, userId: 1, title: 'Title', completed: true },
    { id: 2, userId: 2, title: 'Title 2', completed: false },
    { id: 3, userId: 2, title: 'Title 3', completed: true }
  ]

  it.only("call jsonplaceholder when click on load todo button", async () => {
    const mockFetch = fetchResolve(mockFetchResponseWithOne)
    global.fetch = mockFetch

    renderComponent()

    const button = findButtonByText('load todo')
    await button.trigger('click');

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/todos")
  });

  it('render todoItems when click on load todo button', async () => {
    const mockFetch = fetchResolve(mockFetchResponseWithThird)
    global.fetch = mockFetch
    
    renderComponent()

    const button = findButtonByText('load todo')
    await button.trigger('click')

    await nextTick()
    await nextTick()

    const wrapperText = wrapper.text()
    // console.log(wrapperText)
    mockFetchResponseWithThird.forEach(todo => {
      expect(wrapperText).toContain(todo.title)
      expect(wrapperText).toContain(todo.userId)
    })
  })

  it('render current count when click on load todo button', async () => {
    const mockFetch = fetchResolve(mockFetchResponseWithThird)
    global.fetch = mockFetch
    
    renderComponent()

    expect(wrapper.text()).toContain('Total count 0')

    const button = findButtonByText('load todo')
    await button.trigger('click')

    await nextTick()
    await nextTick()
    
    expect(wrapper.text()).toContain('Total count 3')
  })

  it('render count 0 when click on delete all button', async () => {
    const mockFetch = fetchResolve(mockFetchResponseWithThird)
    global.fetch = mockFetch
    renderComponent()
    expect(wrapper.text()).toContain('Total count 0')
    const buttonLoad = findButtonByText('load todo')
    await buttonLoad.trigger('click')
    await nextTick()
    await nextTick()
    expect(wrapper.text()).toContain('Total count 3')

    const buttonDelete = findButtonByText('delete all')
    await buttonDelete.trigger('click')

    expect(wrapper.text()).toContain('Total count 0')
  })

  it('delete todo item if click on X', async () => {
    const mockFetch = fetchResolve(mockFetchResponseWithThird)
    global.fetch = mockFetch
    renderComponent()

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

  it('call console.error if call jsonplaceholder with error', async () => {
    // const mockError = jest.spyOn(global.console, 'error')
    const mockError = jest.fn()
    global.console = { error: mockError }
    const mockFetch = jest.fn().mockRejectedValue({ code: 404 })
    global.fetch = mockFetch
    renderComponent()

    const buttonLoad = findButtonByText('load todo')
    await buttonLoad.trigger('click')
    await nextTick()
    
    expect(mockError).toHaveBeenCalledWith('Error', { code: 404 })
  })
});
