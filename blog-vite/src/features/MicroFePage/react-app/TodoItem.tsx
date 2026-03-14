'use client';

import { useRef, useState } from 'react';
import { TodoItem as TodoItemType } from '../shared/todoTypes';

interface TodoItemProps {
  item: TodoItemType;
  onToggle: (id: string, completed: boolean) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ item, onToggle, onEdit, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const editRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    setEditing(true);
    setEditText(item.text);
    setTimeout(() => editRef.current?.focus(), 0);
  };

  const saveEdit = () => {
    if (editing && editText.trim()) {
      onEdit(item.id, editText.trim());
    }
    setEditing(false);
    setEditText('');
  };

  return (
    <li data-testid="react-todo-item" className="flex items-center gap-2 group">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={() => onToggle(item.id, !item.completed)}
        className="shrink-0"
      />
      {editing ? (
        <input
          data-testid="react-todo-edit"
          ref={editRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
          onBlur={saveEdit}
          className="flex-1 px-2 py-0.5 text-sm border border-blue-400 rounded focus:outline-none"
        />
      ) : (
        <span
          onDoubleClick={startEdit}
          className={`flex-1 text-sm cursor-pointer ${item.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}
        >
          {item.text}
        </span>
      )}
      <button
        onClick={startEdit}
        className="text-xs text-slate-400 hover:text-blue-500"
      >
        edit
      </button>
      <button
        onClick={() => onDelete(item.id)}
        className="text-xs text-slate-400 hover:text-red-500"
      >
        delete
      </button>
    </li>
  );
}
