class LocalStorageService {
  setItem<T>(storageKey: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(storageKey, serializedValue);
      console.info(`${storageKey} set in localStorage`);
    } catch (error) {
      console.error(`Error setting ${storageKey} in localStorage`, error);
    }
  }

  getItem<T>(storageKey: string): T | null {
    try {
      const serializedValue = localStorage.getItem(storageKey);
      if (serializedValue === null) {
        return null;
      }
      console.info(`${storageKey} loaded from localStorage`);
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error getting ${storageKey} from localStorage`, error);
      return null;
    }
  }

  removeItem(storageKey: string): void {
    try {
      localStorage.removeItem(storageKey);
      console.info(`${storageKey} removed from localStorage`);
    } catch (error) {
      console.error(`Error removing ${storageKey} from localStorage`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage', error);
    }
  }
}

export default new LocalStorageService();
