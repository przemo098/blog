export default class ServiceBus {
  private readonly serviceBusDomId = "serviceBus";
  private serviceBusDomElement: HTMLElement = new HTMLElement();
  private TodoEvents = new Array<Event>();

  constructor() {
    if (!document.getElementById(this.serviceBusDomId)) {
      this.serviceBusDomElement = document.createElement(this.serviceBusDomId);
      this.serviceBusDomElement.setAttribute("id", this.serviceBusDomId);
    }
    this.createEvents();
  }

  subcribeTo(event: TodoEventEnum, action: (event: Event) => void) {
    this.serviceBusDomElement.addEventListener(TodoEventEnum[event], action);
  }

  dispatchEvent(eventType: string, data: ITodoItem){
    let event = new CustomEvent(eventType, {detail: data, bubbles: false});
    this.serviceBusDomElement.dispatchEvent(event);
  }

  private createEvents(): any {
    for (const event in TodoEventEnum) {
      if (isNaN(Number(event))) {
        this.TodoEvents.push(new Event(event));
      }
    }
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
