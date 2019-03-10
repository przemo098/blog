import { Component, OnInit } from '@angular/core';
import ServiceBus, {ITodoItem, TodoEventEnum} from '../../../../../shared/todoServiceBus'

@Component({
  selector: 'app-angular-todo',
  templateUrl: './angular-todo.component.html',
  styleUrls: ['./angular-todo.component.scss']
})
export class AngularTodoComponent implements OnInit {

  constructor() {
    this.serviceBus = new ServiceBus();
   }

  items: Array<ITodoItem>
  serviceBus: ServiceBus;

  ngOnInit() {
    this.serviceBus.subcribeTo(TodoEventEnum.AddItem, () => console.log("jedziemy z koxem"))
    this.serviceBus.dispatchEvent(TodoEventEnum.AddItem, {key: 1, text: "asdasd"});
  }

}
