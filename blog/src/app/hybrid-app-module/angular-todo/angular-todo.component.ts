import { Component, OnInit } from "@angular/core";
// import ServiceBus, {
//   ITodoItem,
//   TodoEventEnum
// } from "../../../../../shared/todoServiceBus";
// import TodoStore from "../../../../../shared/todoStore";

@Component({
  selector: "app-angular-todo",
  templateUrl: "./angular-todo.component.html",
  styleUrls: ["./angular-todo.component.scss"]
})
export class AngularTodoComponent implements OnInit {
  constructor() {
      // this.items = TodoStore.items;
      // this.newItem = TodoStore.newItem;
  }

  // onKeyDown(){
  //   TodoStore.updateNewItemText(this.newItem.text)
  // }

  // addItem(){
  //   TodoStore.add();
  // }

  // removeItem(){
  //   TodoStore.delete(this.newItem);
  // }

  ngOnInit() {
  }
}
