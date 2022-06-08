<template>
  <div class="todo-wrapper">
    <div class="todo-content">
      <span class="todo-content__id">UserId: {{ todo.userId }} </span>
      <p>{{ todo.title }}</p>
      <span> {{ todo.completed }} </span>
    </div>
    <div>
      <button @click="$emit('delete', todo.id)">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",

  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.todo-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  margin: 5px 0;
  padding: 0 10px;
}

.todo-content {
  display: flex;
  align-items: center;
}

.todo-content__id {
  margin-right: 10px;
}
</style>
