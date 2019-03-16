import * as React from "react";
import { Component } from "react";
// import "./App.scss";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import ServiceBus from '../../shared/todoServiceBus';

interface IAppState {
  items: Array<ITodoItem>;
  currentItem: ITodoItem;
}

class App extends Component<any, IAppState> {
  serviceBus: ServiceBus;
  constructor(props: any) {    
    super(props);

    this.state = {
      items: [],
      currentItem: { text: "", key: Date.now() }
    };
    this.serviceBus = new ServiceBus();
    this.serviceBus.subcribeTo(TodoEventEnum.AddItem, () => this.addItem());
    this.serviceBus.subcribeTo(TodoEventEnum.DeleteItem, (item: CustomEvent<ITodoItem>) => this.deleteItem(item.detail));
  }
  inputElement: any = React.createRef();
  handleInput = (e: any) => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() };
    this.setState({
      currentItem
    });
  };

  addItem(): void {
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { text: "", key: Date.now() }
      });
    }
  };

  deleteItem(item: ITodoItem) {
    console.log(item);
    const filteredItems = this.state.items.filter(x => {
      return x.key !== item.key;
    });
    this.setState({
      items: filteredItems
    });
  };

  render() {
    console.log("trololo");
    return (
      <div>
dupa
      </div>
    );
  }
}

export default App;


export enum TodoEventEnum {
  AddItem,
  DeleteItem
}

export interface ITodoItem {
  key: number;
  text: string;
}
