'use client'
import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  useToast
} from '@chakra-ui/react';

interface Expense {
  title: string;
  description: string;
  amount: number;
  category: string;
}

const ExpenseForm: React.FC = () => {
  const [expense, setExpense] = useState<Expense>({
    title: '',
    description: '',
    amount: 0,
    category: ''
  });

  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpense(prevExpense => ({
      ...prevExpense,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can send the expense data to the backend for validation by the project manager
    // For demonstration purposes, we'll just log the expense data
    console.log(expense);
    toast({
      title: 'Expense submitted',
      description: 'Your expense has been submitted for validation by the project manager.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    // Reset the form after submission
    setExpense({
      title: '',
      description: '',
      amount: 0,
      category: ''
    });
  };

  return (
    <Box maxW="md" mx="auto" p={4} borderWidth="1px" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <FormControl mb={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" value={expense.title} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Description</FormLabel>
          <Textarea name="description" value={expense.description} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Amount</FormLabel>
          <Input type="number" name="amount" value={expense.amount} onChange={handleInputChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Category</FormLabel>
          <Select name="category" value={expense.category} onChange={handleInputChange}>
            <option value="office">Office Supplies</option>
            <option value="travel">Travel</option>
            <option value="equipment">Equipment</option>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <Button type="submit" colorScheme="blue">Submit</Button>
      </form>
    </Box>
  );
};

export default ExpenseForm;
