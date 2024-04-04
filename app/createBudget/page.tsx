'use client'
import React, { useState } from 'react';

const BudgetForm: React.FC = () => {
  const [budget,  setBudget] = useState('');
  const [description,  setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedBudget = parseFloat(budget);
    if (parsedBudget >= 5000) {
      // Perform action with valid budget amount
      console.log('Budget submitted:', parsedBudget);
      setErrorMessage('');
      // Reset form
      setBudget('');
    } else {
      setErrorMessage('Minimum budget amount is $5000');
    }
  };

  return (
    <div>
      <h1>Budget Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="budgetInput">Enter Budget Amount:</label>
        <input
          id="budgetInput"
          type="number"
          value={budget}
          onChange={handleChange}
          placeholder="Enter budget amount"
          required
        />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default BudgetForm;
