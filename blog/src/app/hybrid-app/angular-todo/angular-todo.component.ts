import { Component, OnInit } from "@angular/core";
import ServiceBus, {
  ITodoItem,
  TodoEventEnum
} from "../../../../../shared/todoServiceBus";
import TodoStore from "../../../../../shared/todoStore";

@Component({
  selector: "app-angular-todo",
  templateUrl: "./angular-todo.component.html",
  styleUrls: ["./angular-todo.component.scss"]
})
export class AngularTodoComponent implements OnInit {
  items: Array<ITodoItem>;
  newItem: ITodoItem;

  constructor() {
      this.items = TodoStore.items;
      this.newItem = TodoStore.newItem;
      ServiceBus.subcribeTo(TodoEventEnum.InputTextChange, () => this.newItem = TodoStore.newItem)
      ServiceBus.subcribeTo(TodoEventEnum.TodoListChange, () => this.items = TodoStore.items)
  }

  addItem(){
    TodoStore.add();
  }

  removeItem(item: ITodoItem){
    TodoStore.delete(item);
  }

  ngOnInit() {
  }
}
