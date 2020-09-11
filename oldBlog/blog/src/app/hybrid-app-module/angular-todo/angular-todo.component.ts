import { Component, AfterContentInit, ChangeDetectorRef } from "@angular/core";
import { TodoItem, } from '../../../../../shared/src/index'
import AppState from "../../../../../shared/src/todoState";
import { TodoStateManager } from "../../../../../shared/src/stateManager";

@Component({
  selector: "app-angular-todo",
  templateUrl: "./angular-todo.component.html",
  styleUrls: ["./angular-todo.component.scss"]
})
export class AngularTodoComponent implements AfterContentInit {
  items: TodoItem[];
  newItem: TodoItem;
  private stateManager = new TodoStateManager();
  constructor(private cdr: ChangeDetectorRef) {
    this.items = AppState.items.value;
    this.newItem = AppState.newItem.value;
  }
  ngAfterContentInit(): void {
    AppState.newItem.subscribe(x => {
      this.newItem = x
      this.cdr.detectChanges();
    });
    AppState.items.subscribe(x => {
      this.items = x
      this.cdr.detectChanges();
    });
  }

  onKeyDown() {
    this.stateManager.updateNewTodo(this.newItem.text);
  }

  addItem() {
    this.stateManager.addNewElement();
  }

  removeItem(item: TodoItem) {
    this.stateManager.deleteByKey(item.key);
  }
}
