import { Component } from "react";
import * as React from "react";
import ServiceBus, { ITodoItem, TodoEventEnum } from "../../../shared/todoServiceBus";

interface ITodoFormProps {
  inputElement: any;
  handleInput: (e: React.ChangeEvent) => void;
  currentItem: ITodoItem;
}

class TodoForm extends Component<ITodoFormProps, any> {
  todoEventBus: ServiceBus;
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.todoEventBus = new ServiceBus();    
  }

  componentDidUpdate() {
    this.props.inputElement.current.focus();
  }

  render() {
    return (
      <div className="todoList">
        <div className="header">
          <form
            onSubmit={e => {
              e.preventDefault();
              this.todoEventBus.dispatchEvent(
                TodoEventEnum.AddItem,
                this.props.currentItem
              );
            }}
          >
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <input
                  className="form-control"
                  placeholder="Task"
                  ref={this.props.inputElement}
                  value={this.props.currentItem.text}
                  onChange={this.props.handleInput}
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
