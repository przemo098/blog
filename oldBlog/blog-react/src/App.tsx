import * as React from "react";
import { Component } from "react";
import "./App.scss";
import TodoForm from "./TodoForm/TodoForm";
import TodoList from "./TodoList/TodoList";
import * as Logo from './logo.svg';

class App extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="todo-container">
        <img className="logo" src={Logo as any}></img>
        <div className="d-flex flex-column todo-list">
          <div>
            <TodoForm />
            <TodoList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;