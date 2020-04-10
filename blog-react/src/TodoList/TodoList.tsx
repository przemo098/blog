import "./TodoList.scss";
import { Component } from "react";
import * as React from "react";
import * as GunSvg from "./gun.svg";
import * as CancelSvg from "../../../shared/assets/cancel.svg";
import AppState, { TodoItem } from "shared/src/todoState";
import { StateManager } from "shared/src";

interface ITodoListState {
  entries: Array<TodoItem>;
}

class TodoList extends Component<any, ITodoListState> {
  private stateManager = new StateManager();
  constructor(props: any) {
    super(props);
    this.state = { entries: AppState.items.value };
  }

  componentDidMount() {
    AppState.items.subscribe(x => this.setState({ entries: x }))
  }

  createTask = (item: TodoItem) => {
    return (
      <div className="d-flex align-items-center item" key={item.key}>
        <div className="d-flex">
          <div className="bullet">
            <img src={GunSvg as any} />
          </div>
          <div className="todo-text">{item.text}</div>
        </div>
        <div className="ml-auto svg" onClick={e => this.stateManager.deleteByKey(item.key)}>
          <img src={CancelSvg as any} />
        </div>
      </div>
    );
  };

  render() {
    const listItems = this.state.entries.map(this.createTask);
    return <div>{listItems}</div>;
  }
}

export default TodoList;
