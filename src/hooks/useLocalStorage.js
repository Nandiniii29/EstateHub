import { useState, useEffect } from 'react';
import { readStorage, writeStorage } from '../utils/storage.js';

// A useState-like hook that keeps its value in sync with localStorage.
// Usage: const [favorites, setFavorites] = useLocalStorage('estatehub_favorites', []);
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue));

  useEffect(() => {
    writeStorage(key, value);
  }, [key, value]);

  return [value, setValue];
}
