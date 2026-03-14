import { Component, OnInit, OnDestroy, ViewEncapsulation, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItem } from './todo-item.model';
import { TodoFormComponent } from './todo-form.component';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoFormComponent, TodoItemComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit, OnDestroy {
  items: TodoItem[] = [];
  private unsubscribe: (() => void) | null = null;

  constructor(private zone: NgZone) {}

  ngOnInit() {
    const bus = (window as any).__microFeBus;
    if (bus) {
      this.items = [...bus.getState().items];
      this.unsubscribe = bus.subscribe((state: { items: TodoItem[] }) => {
        this.zone.run(() => {
          this.items = [...state.items];
        });
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe?.();
  }

  addTodo(text: string) {
    (window as any).__microFeBus?.addTodo(text);
  }

  toggleComplete(item: TodoItem) {
    (window as any).__microFeBus?.updateTodo(item.id, { completed: !item.completed });
  }

  updateTodo(event: { id: string; text: string }) {
    (window as any).__microFeBus?.updateTodo(event.id, { text: event.text });
  }

  deleteTodo(id: string) {
    (window as any).__microFeBus?.deleteTodo(id);
  }
}
