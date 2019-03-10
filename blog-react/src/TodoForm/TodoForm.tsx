import React, { Component } from "react";
import ServiceBus, { ITodoItem, TodoEventEnum } from "../../../shared/todoServiceBus";

interface ITodoFormProps {
  inputElement: any;
  addItem: (e: React.FormEvent) => void;
  handleInput: (e: React.ChangeEvent) => void;
  currentItem: ITodoItem;
}

class TodoForm extends Component<ITodoFormProps, any> {
  eventBus: ServiceBus;
  /**
   *
   */
  constructor(props: any) {
    super(props);
    this.eventBus = new ServiceBus();
    this.eventBus.subcribeTo(TodoEventEnum.AddItem, () => console.log("dupa"));
  }




  componentDidUpdate() {
    this.props.inputElement.current.focus();
  }

  render() {
    return (
      <div className="todoList">
        <div className="header">
          <form onSubmit={this.props.addItem}>
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
