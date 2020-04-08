import { Component } from "react";
import * as React from "react";
import AppState, { TodoItem } from "shared/src";

interface ITodoFormState {
  currentItem: TodoItem;
}

class TodoForm extends Component<any, ITodoFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentItem: AppState.newItem.value
    };
  }
  inputElement: any = React.createRef();

  componentDidMount() {
    AppState.newItem.subscribe(x => this.setState({
      currentItem: x
    }));
  }

  handleUpdate(e: any) {
    const itemText = e.target.value;
    AppState.newItem.next(new TodoItem(itemText))
  }

  render() {
    return (
      <div className="todoList">
        <div className="header">
          <form
            onSubmit={e => {
              e.preventDefault();
              AppState.items.next(AppState.items.value.concat(AppState.newItem.value))
            }}
          >
            <div className="input-group input-group-sm mb-3">
              <div className="input-group-prepend">
                <input
                  className="form-control"
                  placeholder="Task"
                  ref={this.inputElement}
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
