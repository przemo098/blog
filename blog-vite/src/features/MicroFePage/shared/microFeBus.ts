import { TodoItem, TodoState } from './todoTypes';

export interface MicroFeBus {
  getState(): TodoState;
  setState(state: TodoState): void;
  subscribe(callback: (state: TodoState) => void): () => void;
  addTodo(text: string): void;
  updateTodo(id: string, updates: Partial<TodoItem>): void;
  deleteTodo(id: string): void;
}

function createBus(): MicroFeBus {
  let state: TodoState = { items: [] };
  const listeners = new Set<(s: TodoState) => void>();

  function notify() {
    const snapshot = { ...state, items: [...state.items] };
    listeners.forEach((cb) => cb(snapshot));
  }

  return {
    getState: () => state,

    setState: (newState: TodoState) => {
      state = newState;
      notify();
    },

    subscribe: (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },

    addTodo: (text: string) => {
      state = {
        items: [
          ...state.items,
          { id: crypto.randomUUID(), text, completed: false },
        ],
      };
      notify();
    },

    updateTodo: (id: string, updates: Partial<TodoItem>) => {
      state = {
        items: state.items.map((t) => (t.id === id ? { ...t, ...updates } : t)),
      };
      notify();
    },

    deleteTodo: (id: string) => {
      state = { items: state.items.filter((t) => t.id !== id) };
      notify();
    },
  };
}

declare global {
  interface Window {
    __microFeBus?: MicroFeBus;
  }
}

export function getMicroFeBus(): MicroFeBus {
  if (!window.__microFeBus) {
    window.__microFeBus = createBus();
  }
  return window.__microFeBus;
}
