import { defineCustomElement } from 'vue';
import TodoList from './TodoList.ce.vue';

const VueTodoList = defineCustomElement(TodoList);

if (!customElements.get('vue-todo-list')) {
  customElements.define('vue-todo-list', VueTodoList);
}
