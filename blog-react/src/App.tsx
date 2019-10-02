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
      <div>
        <div className="logo">
        <img src={Logo as any}></img>
        </div>
        <div className="d-flex justify-content-center list-margin todos">
          <div className="d-flex flex-column">
            <div>
              <TodoForm />
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;