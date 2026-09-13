// Small wrapper around localStorage so callers never have to think about
// JSON parsing/stringifying or missing-key errors.
export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Could not read "${key}" from storage`, error);
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Could not write "${key}" to storage`, error);
  }
}
