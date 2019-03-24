import { Component } from "react";
import * as React from "react";
import TodoServiceBus, { ITodoItem, TodoEventEnum } from "../../../shared/todoServiceBus";
import { ITodoStore } from "../../../shared/todoStore";
import TodoStore from "../../../shared/todoStore";

interface ITodoFormState{
  currentItem: ITodoItem;
}

class TodoForm extends Component<any, ITodoFormState> {
  todoStore: ITodoStore;
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.state = {
      currentItem: { text: "", key: Date.now() }
    };
    this.todoStore = TodoStore;
    TodoServiceBus.subcribeTo(TodoEventEnum.InputTextChange, () =>
    this.setState({
      currentItem: TodoStore.newItem
    })
  );
  }
  inputElement: any = React.createRef();

  componentDidUpdate() {
  }

  handleUpdate(e: any){
    const itemText = e.target.value;
    TodoStore.updateNewItemText(itemText);
    this.setState({
      currentItem: TodoStore.newItem
    });
  }

  render() {
    return (
      <div className="todoList">
        <div className="header">
          <form
            onSubmit={e => {
              e.preventDefault();
              TodoStore.add();
              this.setState({
                currentItem: TodoStore.newItem
              })
            }}
          >
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <input
                  className="form-control"
                  placeholder="Task"
                  ref = {this.inputElement}
                  value={(this.state.currentItem.text)}
                  onChange={(e) => this.handleUpdate(e)}
                />
              </div>

              <button type="submit" className="btn btn-primary">
                {" "}
                Add Task{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default TodoForm;
