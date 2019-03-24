import "./TodoList.scss";
import { Component } from "react";
import * as React from "react";
import { ITodoItem, TodoEventEnum } from "../../../shared/todoServiceBus";
import TodoServiceBus from "../../../shared/todoServiceBus";
import * as GunSvg from "./gun.svg";
import * as CancelSvg from "../../../shared/assets/cancel.svg";
import TodoStore from "../../../shared/todoStore";

interface ITodoListState {
  entries: Array<ITodoItem>;
}

class TodoList extends Component<any, ITodoListState> {
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      entries: TodoStore.items
    };
    TodoServiceBus.subcribeTo(TodoEventEnum.TodoListChange, () =>
      this.updateState()
    );
  }

  updateState() {
    this.setState({
      entries: TodoStore.items
    });
  }

  createTasks = (item: ITodoItem) => {
    return (
      <div className="d-flex align-items-center" key={item.key}>
        <div className="d-flex">
          <div className="bullet">
            <img src={GunSvg as any} />
          </div>
          <div className="todo-text">{item.text}</div>
        </div>
        <div className="ml-auto svg" onClick={e => TodoStore.delete(item)}>
          <img src={CancelSvg as any} />
        </div>
      </div>
    );
  };

  render() {
    const listItems = this.state.entries.map(this.createTasks);
    return <div>{listItems}</div>;
  }
}

export default TodoList;
