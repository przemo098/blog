import 'zone.js';
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { TodoListComponent } from './app/todo-list.component';

(async () => {
  const app = await createApplication({
    providers: [],
  });

  const TodoListElement = createCustomElement(TodoListComponent, {
    injector: app.injector,
  });

  if (!customElements.get('angular-todo-list')) {
    customElements.define('angular-todo-list', TodoListElement);
  }
})();
