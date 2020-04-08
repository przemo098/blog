import "./TodoList.scss";
import { Component } from "react";
import * as React from "react";
import AppState, { TodoItem } from 'shared/src/index'
import * as GunSvg from "./gun.svg";
import * as CancelSvg from "../../../shared/assets/cancel.svg";

interface ITodoListState {
  entries: Array<TodoItem>;
}

class TodoList extends Component<any, ITodoListState> {
  constructor(props: any) {
    super(props);
    this.state = { entries: AppState.items.value };
  }

  componentDidMount() {
    AppState.items.subscribe(x => this.setState({ entries: x }))
  }

  updateState() {
    this.setState({
    });
  }

  createTasks = (item: TodoItem) => {
    return (
      <div className="d-flex align-items-center item" key={item.key}>
        <div className="d-flex">
          <div className="bullet">
            <img src={GunSvg as any} />
          </div>
          <div className="todo-text">{item.text}</div>
        </div>
        <div className="ml-auto svg" onClick={e => this.deleteFromState(item)}>
          <img src={CancelSvg as any} />
        </div>
      </div>
    );
  };

  private deleteFromState(item: TodoItem) {
    const itemsToPersist = AppState.items.value.filter(x => x !== item)
    AppState.items.next(itemsToPersist);
  }

  render() {
    const listItems = this.state.entries.map(this.createTasks);
    return <div>{listItems}</div>;
  }
}

export default TodoList;
