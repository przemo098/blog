import AppState, { TodoItem } from "./todoState";

export class TodoStateManager {
    addNewElement(item: TodoItem) {
        AppState.items.next([...AppState.items.value, item]);
    }

    deleteItem(key: number) {
        const filteredItems = AppState.items.value.filter(x => x.key !== key);
        AppState.items.next(filteredItems);
    }

    updateNewTodo(item: string) {
        const newValue = new TodoItem(item);
        AppState.newItem.next(newValue);
    }
}