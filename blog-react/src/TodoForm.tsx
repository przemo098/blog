import React, { Component, ChangeEvent } from "react";
import { ITodoItem } from "./App";

interface ITodoFormProps {
  inputElement: any;
  addItem: (e: React.FormEvent) => void;
  handleInput: (e: React.ChangeEvent) => void;
  currentItem: ITodoItem;  
}

class TodoForm extends Component<ITodoFormProps, any> {
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
