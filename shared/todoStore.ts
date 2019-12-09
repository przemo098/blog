import { ITodoItem, TodoEventEnum } from "./todoServiceBus";
// import TodoServiceBus from './todoServiceBus';

export interface ITodoStore {
  // add: () => void;
  // delete: (item: ITodoItem) => void;
  // updateNewItemText: (e: any) => void;
  items: Array<ITodoItem>;
  newItem: ITodoItem;
}

class TodoStore implements ITodoStore {
  items: Array<ITodoItem>;
  newItem: ITodoItem;

  constructor() {
    this.items = [];
    this.newItem = { text: "", key: Date.now() };
  }

  // add() {
  //   if(!this.newItem.text)
  //     return;
  //   this.newItem.key = Date.now();
  //   this.items.push({...this.newItem});
  //   this.newItem.text ="";  
  //   TodoServiceBus.dispatchEvent(TodoEventEnum.TodoListChange, null)  
  // }

  // delete(item: ITodoItem) {
  //   const index = this.items.indexOf(item);
  //   this.items.splice(index, 1)
  //   TodoServiceBus.dispatchEvent(TodoEventEnum.TodoListChange, null)
  // }

  // updateNewItemText = (value: string) => {
  //   this.newItem.text = value;
  //   TodoServiceBus.dispatchEvent(TodoEventEnum.InputTextChange, null)
  // };
}


if(!(window as any).todoStore){
  (window as any).todoStore = new TodoStore();
}

const instance: ITodoStore = (window as any).todoStore;
Object.freeze(instance);

export default instance;
