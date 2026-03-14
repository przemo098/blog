import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItem } from './todo-item.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input({ required: true }) item!: TodoItem;
  @Output() toggle = new EventEmitter<TodoItem>();
  @Output() edit = new EventEmitter<{ id: string; text: string }>();
  @Output() delete = new EventEmitter<string>();

  editing = false;
  editText = '';

  startEdit() {
    this.editing = true;
    this.editText = this.item.text;
  }

  saveEdit() {
    if (this.editing && this.editText.trim()) {
      this.edit.emit({ id: this.item.id, text: this.editText.trim() });
    }
    this.editing = false;
    this.editText = '';
  }
}
