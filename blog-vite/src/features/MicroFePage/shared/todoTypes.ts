export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  items: TodoItem[];
}
