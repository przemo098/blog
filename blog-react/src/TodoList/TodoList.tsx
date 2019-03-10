import "./TodoList.scss";
import React, { Component } from "react";
import { ITodoItem } from "../../../shared/todoServiceBus";

interface ITodoListProps {
  entries: any;
  deleteItem: (key: any) => void;
}

class TodoList extends Component<ITodoListProps, any> {
  createTasks = (item: ITodoItem) => {
    return (
      <div className="d-flex align-items-center" key={item.key}>
        <div className="">
          <img src={require("./gun.svg")} className="bullet" />
        </div>
        <div className="todo-text">{item.text}</div>
        <div className="ml-auto">
          <img src={require("./cancel.svg")} className="svg" onClick={() => this.props.deleteItem(item.key)}/>
        </div>
      </div>
    );
  };
  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <div>{listItems}</div>;
  }
}

export default TodoList;
