import { useEffect } from 'react';

/**
 * Custom hook that cleans the messages of a component when is unmount
 * @param {Function} callback function that will be executed to clean the messages
 * @return {Function} the callback function executed
 */
export default function useCleanUp(callback) {
  useEffect(() => {
    return () => {
      callback();
    };
  }, [callback]);
}
