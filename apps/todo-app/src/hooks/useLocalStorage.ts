import { useState } from "react";

export function useLocalStorage<K>(key: string, initialValue: K) {
  const [storedData, setStoredData] = useState<K>(() => {
    const item = window.localStorage.getItem(key);

    return item ? (JSON.parse(item) as K) : initialValue;
  });

  const setData = (value: K) => {
    setStoredData(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedData, setData] as [K, typeof setData];
}
