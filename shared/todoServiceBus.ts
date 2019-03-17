
import  TodoStore, { ITodoStore}  from './todoStore';

export class ServiceBus {
  private readonly serviceBusDomId = "serviceBus";
  private serviceBusDomElement: HTMLElement;
  public store: ITodoStore;

  constructor() {
    this.store = TodoStore;
    this.serviceBusDomElement = document.getElementById(
      this.serviceBusDomId
    ) as HTMLElement;
    if (!this.serviceBusDomElement) {
      let htmlElement = document.createElement(this.serviceBusDomId);
      htmlElement.setAttribute("id", this.serviceBusDomId);
      this.serviceBusDomElement = document.body.appendChild(htmlElement);
    }
  }

  subcribeTo(event: TodoEventEnum, action: (event: CustomEvent) => void) {
    this.serviceBusDomElement.addEventListener(TodoEventEnum[event], action as EventListener);
  }

  dispatchEvent(eventType: TodoEventEnum, data: ITodoItem) {
    let event = new CustomEvent(TodoEventEnum[eventType], {
      detail: data,
      bubbles: false
    });
    this.serviceBusDomElement.dispatchEvent(event);
  }
}

const instance = new ServiceBus();
Object.freeze(instance);

export default instance;

export enum TodoEventEnum {
  ItemAdded,
  DeleteItem,
  TodoListChange
}

export interface ITodoItem {
  key: number;
  text: string;
}