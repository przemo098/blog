<template>
  <div class="todo-container">
    <TodoForm @add="addTodo" />

    <p v-if="items.length === 0" class="empty">No todos yet</p>

    <ul class="todo-list">
      <TodoItemComp
        v-for="item in items"
        :key="item.id"
        :item="item"
        @toggle="toggleComplete"
        @edit="updateTodo"
        @delete="deleteTodo"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { TodoItem } from './todoTypes';
import TodoForm from './TodoForm.vue';
import TodoItemComp from './TodoItem.vue';

const items = ref<TodoItem[]>([]);
let unsubscribe: (() => void) | null = null;

function getBus() {
  return (window as any).__microFeBus;
}

onMounted(() => {
  const bus = getBus();
  if (bus) {
    items.value = [...bus.getState().items];
    unsubscribe = bus.subscribe((state: { items: TodoItem[] }) => {
      items.value = [...state.items];
    });
  }
});

onUnmounted(() => {
  unsubscribe?.();
});

function addTodo(text: string) {
  getBus()?.addTodo(text);
}

function toggleComplete(item: TodoItem) {
  getBus()?.updateTodo(item.id, { completed: !item.completed });
}

function updateTodo(event: { id: string; text: string }) {
  getBus()?.updateTodo(event.id, { text: event.text });
}

function deleteTodo(id: string) {
  getBus()?.deleteTodo(id);
}
</script>

<style>
.todo-container { font-family: system-ui, sans-serif; font-size: 14px; }
.add-form { display: flex; gap: 8px; margin-bottom: 12px; }
.todo-input, .edit-input {
  flex: 1; padding: 6px 12px; border: 1px solid #cbd5e1;
  border-radius: 4px; font-size: 14px; outline: none;
}
.todo-input:focus, .edit-input:focus { border-color: #60a5fa; box-shadow: 0 0 0 2px rgba(96,165,250,0.3); }
.btn { padding: 6px 12px; border: none; border-radius: 4px; font-size: 14px; cursor: pointer; }
.btn-add { background: #2563eb; color: white; }
.btn-add:hover { background: #1d4ed8; }
.btn-icon { background: none; border: none; font-size: 12px; color: #94a3b8; cursor: pointer; }
.btn-delete:hover { color: #ef4444; }
.btn-icon:hover { color: #3b82f6; }
.todo-list { list-style: none; padding: 0; margin: 0; }
.todo-item { display: flex; align-items: center; gap: 8px; padding: 2px 0; }
.todo-text { flex: 1; cursor: pointer; color: #334155; }
.todo-text.completed { text-decoration: line-through; color: #94a3b8; }
.empty { color: #94a3b8; font-style: italic; }
</style>
