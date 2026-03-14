'use client';

import { getMicroFeBus } from '../shared/microFeBus';
import { useMicroFeBus } from './useMicroFeBus';
import { TodoForm } from './TodoForm';
import { TodoItem } from './TodoItem';

export default function ReactTodoList() {
  const { items } = useMicroFeBus();
  const bus = getMicroFeBus();

  return (
    <div className="space-y-3">
      <TodoForm onAdd={(text) => bus.addTodo(text)} />
      {items.length === 0 && (
        <p className="text-sm text-slate-400 italic">No todos yet</p>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onToggle={(id, completed) => bus.updateTodo(id, { completed })}
            onEdit={(id, text) => bus.updateTodo(id, { text })}
            onDelete={(id) => bus.deleteTodo(id)}
          />
        ))}
      </ul>
    </div>
  );
}
