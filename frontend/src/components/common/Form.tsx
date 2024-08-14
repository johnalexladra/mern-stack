import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import './Form.css';

interface FormProps {
  onAdd: (value: string) => void;
}

const Form: React.FC<FormProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      setInputValue('');
    } else {
      alert('Please enter some text.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="inputField">Input:</label>
      <Input
        id="inputField"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter text"
      />
      <Button onClick={() => {}} type="submit">Add Row</Button>
    </form>
  );
};

export default Form;
