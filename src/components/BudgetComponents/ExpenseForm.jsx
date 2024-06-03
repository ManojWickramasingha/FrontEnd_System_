import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
  border: '1px dashed #ccc',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px'
});

const ExpenseForm = ({ onAddExpense, budgetCategories }) => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('');

  const handleAddExpense = () => {
    onAddExpense({ expenseName, amount: parseFloat(amount), budgetCategory });
    setExpenseName('');
    setAmount('');
    setBudgetCategory('');
  };

  return (
    <FormContainer>
      <Typography variant="h6">Add New Expense</Typography>
      <TextField
        label="Expense Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        placeholder="e.g., Coffee"
      />
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 3.50"
      />
      <TextField
        select
        label="Budget Category"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budgetCategory}
        onChange={(e) => setBudgetCategory(e.target.value)}
      >
        {budgetCategories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </TextField>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddExpense}
        style={{ backgroundColor: '#07271F', textTransform: 'none' , marginTop: '10px', fontSize: '16px'}}
      >
        Add Expense
      </Button>
    </FormContainer>
  );
};

export default ExpenseForm;
