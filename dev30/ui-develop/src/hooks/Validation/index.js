import { useState } from 'react';

/**
 * Function to valid the TextField.
 * @param {object} inputRef is a reference of TextField
 */
export default function useValidation(inputRef) {
  const [valid, setValid] = useState(false);

  function validate() {
    const { validity } = inputRef.current;
    setValid(!validity.valid);
  }

  return {
    valid,
    validate,
  };
}
