import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-form.component.html',
})
export class TodoFormComponent {
  text = '';

  @Output() add = new EventEmitter<string>();

  submit() {
    const trimmed = this.text.trim();
    if (!trimmed) return;
    this.add.emit(trimmed);
    this.text = '';
  }
}
