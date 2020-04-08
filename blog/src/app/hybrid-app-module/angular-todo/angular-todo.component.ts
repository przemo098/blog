import { Component, OnInit } from "@angular/core";
// import AppState, { TodoItem } from 'shared/src'

@Component({
  selector: "app-angular-todo",
  templateUrl: "./angular-todo.component.html",
  styleUrls: ["./angular-todo.component.scss"]
})
export class AngularTodoComponent implements OnInit {
  // items: TodoItem[];
  // newItem: TodoItem;
  constructor() {
    // this.items = AppState.items.value;
    // this.newItem = AppState.newItem.value;
  }

  onKeyDown() {
    // AppState.newItem.next(new TodoItem(this.newItem.text));
  }

  addItem() {
    // AppState.items.next(AppState.items.value.concat(AppState.newItem.value));
    // AppState.newItem.next(new TodoItem());
  }

  // removeItem(item: TodoItem) {
  //   AppState.items.next(AppState.items.value.filter(x => x !== item));
  // }

  ngOnInit() {
  }
}
