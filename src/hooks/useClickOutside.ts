import { useEffect, RefObject } from 'react';

interface UseClickOutsideProps {
  ref: RefObject<HTMLElement>;
  callback: () => void;
}

const useClickOutside = ({ ref, callback }: UseClickOutsideProps) => {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && event.target && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
};

export default useClickOutside;
