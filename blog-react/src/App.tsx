import * as React from 'react';
import { Component } from "react";
import "./App.scss";
import TodoForm from './TodoForm';
import TodoList from './TodoList';

export interface ITodoItem {
  key: number;
  text: string;
}

interface IAppState {
  items: Array<ITodoItem>;
  currentItem: ITodoItem;
}

class App extends Component<any, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      items: [],
      currentItem: { text: "", key: Date.now() }
    };
  }
  inputElement: any = React.createRef();
  handleInput = (e: any) => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() };
    this.setState({
      currentItem
    });
  };
  addItem = (e: React.FormEvent<Element>): void => {
    e.preventDefault();
    const newItem = this.state.currentItem;
    if (newItem.text !== "") {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: { text: "", key: Date.now() }
      });
    }
  };
  deleteItem = (key: number) => {
    const filteredItems = this.state.items.filter(item => {
      return item.key !== key;
    });
    this.setState({
      items: filteredItems
    });
  };
  render() {
    return (
      <div className="d-flex">
        <img src={require("./logo.svg")} className="logo" />
        <div className="d-flex justify-content-center list-margin">
          <div className="d-flex flex-column">
            <div>
              <TodoForm
                addItem={this.addItem}
                inputElement={this.inputElement}
                handleInput={this.handleInput}
                currentItem={this.state.currentItem}
              />
              <TodoList
                entries={this.state.items}
                deleteItem={this.deleteItem}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
