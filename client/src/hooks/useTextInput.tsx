import Text from '@components/Text';
import { useState } from 'react';

const useTextInput = (label: string, maxLength?: number): any[] => {
  const [inputText, setInputText] = useState('');

  const handleOnChange = ({ target }): void => {
    console.log(target);
    console.log(inputText.length);
  };

  return [handleOnChange];
};

export default useTextInput;
