import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;
type RemoveValue = () => void;

const isClient = typeof window !== 'undefined';

export const getCookieValue = (fieldName: string) => {
  const allCookies = isClient ? document.cookie : null;
  if (!allCookies) return '';
  const cookieArray = allCookies.split(';');
  return cookieArray
    .map(element => {
      const [key, value] = element.split('=');
      return key.trim() === fieldName ? value : '';
    })
    .filter(element => element)[0];
};

function useCookie<T>(key: string, initialValue: T): [T, SetValue<T>, RemoveValue] {
  const readValue = useCallback((): T => {
    const item = getCookieValue(key);
    return item ? (JSON.parse(item) as T) : initialValue;
  }, [initialValue, key]);

  const [cookie, setStoredValue] = useState<T>(readValue);

  const updateCookie: SetValue<T> = useCallback(
    value => {
      const valueToStore = value instanceof Function ? value(cookie) : value;
      setStoredValue(valueToStore);
      document.cookie = `${key}=${valueToStore};`;
      return value;
    },
    [key, cookie]
  );
  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const removeCookie = () => {
    if (!getCookieValue(key)) return;
    let now = new Date();
    now.setMonth(now.getMonth() - 1);
    document.cookie = `${key}=;expires= ${now.toUTCString()}`;
  };
  return [cookie, updateCookie, removeCookie];
}

export default (key: string, initial: any) => (isClient ? useCookie(key, initial) : [initial, () => undefined]);
