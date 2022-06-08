<template>
  <div>
    <button @click="fetchTodoList">load todo</button>
    <button @click="deleteTodoList">delete all</button>

    <span>Total count {{ totalCount }}</span>
    <div>
      <template v-for="todo in sliceTodo">
        <todo-item :key="todo.id" :todo="todo" @delete="deleteItem" />
      </template>
    </div>

    <with-slots>
      I'am slots

      <template #warning>Nooo wwarn</template>
      <template #success>Yesss success</template>
    </with-slots>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import WithSlots from '../Slots/WithSlots.vue'

export default {
  name: "TodoPage",
  components: {
    TodoItem,
    WithSlots,
  },
  data: () => ({
    todoList: [],
  }),

  computed: {
    sliceTodo() {
      return this.todoList.slice(0, 5) || [];
    },

    totalCount() {
      return this.todoList.length;
    },
  },

  methods: {
    async fetchTodoList() {
      try {
        const data = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        ).then((res) => res.json());

        this.todoList = data;
      } catch (err) {
        console.error("Error", err);
      }
    },

    deleteTodoList() {
      this.todoList = [];
    },

    deleteItem(id) {
      this.todoList = this.todoList.filter((todo) => todo.id !== id);
    },
  },
};
</script>
