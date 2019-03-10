export default class ServiceBus {
  private readonly serviceBusDomId = "serviceBus";
  private serviceBusDomElement: HTMLElement;

  constructor() {
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

export enum TodoEventEnum {
  AddItem,
  DeleteItem
}

export interface ITodoItem {
  key: number;
  text: string;
}
