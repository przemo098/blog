
// import  TodoStore, { ITodoStore}  from './todoStore';

export class dupa{
  
}
// export class ServiceBus {
//   private readonly serviceBusDomId = "serviceBus";
//   private serviceBusDomElement: HTMLElement; 
//   public store: ITodoStore;

//   constructor() {
//     this.store = TodoStore;
//     this.serviceBusDomElement = document.getElementById(
//       this.serviceBusDomId
//     ) as HTMLElement;
//     if (!this.serviceBusDomElement) {
//       let htmlElement = document.createElement(this.serviceBusDomId);
//       htmlElement.setAttribute("id", this.serviceBusDomId);
//       this.serviceBusDomElement = document.body.appendChild(htmlElement);
//     }
//   }

//   subcribeTo(event: TodoEventEnum, action: (event: CustomEvent) => void) {
//     this.serviceBusDomElement.addEventListener(TodoEventEnum[event], action as EventListener);
//   }

//   dispatchEvent(eventType: TodoEventEnum, data: ITodoItem) {
//     let event = new CustomEvent(TodoEventEnum[eventType], {
//       detail: data,
//       bubbles: false
//     });
//     this.serviceBusDomElement.dispatchEvent(event);
//   }
// }

// export enum TodoEventEnum {
//   ItemAdded,
//   DeleteItem,
//   TodoListChange,
//   InputTextChange
// }

// export interface ITodoItem {
//   key: number;
//   text: string;
// }



// if(!(window as any).serviceBus){
//   (window as any).serviceBus = new ServiceBus();
// }

// const instance: ServiceBus = (window as any).serviceBus;
// Object.freeze(instance);

// export default instance;