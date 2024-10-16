import { useEffect } from 'react';
import LocalStorageService from '../lib/LocalStorage';

export const useVisitorId = () => {
  useEffect(() => {
    const visitorId = LocalStorageService.getItem('visitorId');

    if (!visitorId) {
      const newVisitorId = crypto.randomUUID();
      LocalStorageService.setItem('visitorId', newVisitorId);
    }
  }, []);
};
