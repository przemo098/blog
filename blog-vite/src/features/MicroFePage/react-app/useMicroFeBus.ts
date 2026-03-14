'use client';

import { useEffect, useState } from 'react';
import { getMicroFeBus } from '../shared/microFeBus';
import { TodoState } from '../shared/todoTypes';

export function useMicroFeBus() {
  const [state, setState] = useState<TodoState>(() => getMicroFeBus().getState());

  useEffect(() => {
    const unsubscribe = getMicroFeBus().subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
}
