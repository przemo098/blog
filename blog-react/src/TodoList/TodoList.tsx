import "./TodoList.scss";
import { Component } from "react";
import * as React from "react";
import ServiceBus, {
  ITodoItem,
  TodoEventEnum
} from "../../../shared/todoServiceBus";
import GunSvg from "./gun.svg";
import CancelSvg from "./cancel.svg";

interface ITodoListProps {
  entries: any;
}

class TodoList extends Component<ITodoListProps, any> {
  todoEventBus: ServiceBus;
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.todoEventBus = new ServiceBus();
  }

  createTasks = (item: ITodoItem) => {
    return (
      <div className="d-flex align-items-center" key={item.key}>
        <div className="d-flex">
          <div className="bullet">
            <GunSvg />
          </div>
          <div className="todo-text">{item.text}</div>
        </div>
        <div
          className="ml-auto svg"
          onClick={() =>
            this.todoEventBus.dispatchEvent(TodoEventEnum.DeleteItem, item)}>
          <CancelSvg />
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
