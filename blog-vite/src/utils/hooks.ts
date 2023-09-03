import {useEffect, useState} from "react";
import {Store} from "./Store.ts";

export function useUnwrap<T>(store: Store<T>) {
  const [value, setValue] = useState<T>(() => store.state);
  useEffect(() => {
    const subscription = store.subscribe(setValue);
    return () => subscription.unsubscribe();
  }, [store]);

  return value;
}
