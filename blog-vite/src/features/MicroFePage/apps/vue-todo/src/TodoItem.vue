<template>
  <li class="todo-item" data-testid="vue-todo-item">
    <input
      type="checkbox"
      :checked="item.completed"
      @change="$emit('toggle', item)"
    />
    <span
      v-if="!editing"
      @dblclick="startEdit"
      :class="['todo-text', { completed: item.completed }]"
    >
      {{ item.text }}
    </span>
    <input
      v-else
      v-model="editText"
      @keydown.enter="saveEdit"
      @blur="saveEdit"
      type="text"
      class="edit-input"
      data-testid="vue-todo-edit"
      ref="editInput"
    />
    <button @click="startEdit" class="btn-icon">edit</button>
    <button @click="$emit('delete', item.id)" class="btn-icon btn-delete">delete</button>
  </li>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import type { TodoItem } from './todoTypes';

const props = defineProps<{ item: TodoItem }>();

const emit = defineEmits<{
  toggle: [item: TodoItem];
  edit: [payload: { id: string; text: string }];
  delete: [id: string];
}>();

const editing = ref(false);
const editText = ref('');
const editInput = ref<HTMLInputElement | null>(null);

function startEdit() {
  editing.value = true;
  editText.value = props.item.text;
  nextTick(() => editInput.value?.focus());
}

function saveEdit() {
  if (editing.value && editText.value.trim()) {
    emit('edit', { id: props.item.id, text: editText.value.trim() });
  }
  editing.value = false;
  editText.value = '';
}
</script>
