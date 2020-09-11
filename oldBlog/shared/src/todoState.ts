import { BehaviorSubject } from 'rxjs';

export class TodoState {
    items = new BehaviorSubject<Array<TodoItem>>([]);
    newItem = new BehaviorSubject(new TodoItem());
}

export class TodoItem {
    constructor(text: string = '',) {
        this.text = text;
        this.key = new Date().getUTCMilliseconds();
    }
    key: number;
    text: string = '';
}

if (!(window as any).todoStore) {
    (window as any).todoStore = new TodoState();
}

const AppState: TodoState = (window as any).todoStore;
Object.freeze(AppState);

export default AppState;
