import AppState, { TodoItem } from "./todoState";

export class TodoStateManager {
    private state = AppState;
    addNewElement() {
        this.state.items.next([...this.state.items.value, this.state.newItem.value]);
        this.state.newItem.next(new TodoItem());
    }

    deleteItem(key: number) {
        const filteredItems = this.state.items.value.filter(x => x.key !== key);
        this.state.items.next(filteredItems);
    }

    updateNewTodo(item: string) {
        const newValue = new TodoItem(item);
        this.state.newItem.next(newValue);
    }
}