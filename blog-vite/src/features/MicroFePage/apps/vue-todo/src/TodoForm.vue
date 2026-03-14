<template>
  <div class="add-form">
    <input
      v-model="text"
      @keydown.enter="submit"
      type="text"
      placeholder="Add todo..."
      class="todo-input"
      data-testid="vue-todo-input"
    />
    <button @click="submit" class="btn btn-add">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ add: [text: string] }>();

const text = ref('');

function submit() {
  const trimmed = text.value.trim();
  if (!trimmed) return;
  emit('add', trimmed);
  text.value = '';
}
</script>
