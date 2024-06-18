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
  const [errors, setErrors] = useState({ expenseName: false, amount: false, budgetCategory: false });

  const handleAddExpense = () => {
    if (expenseName === "" || amount === "" || budgetCategory === "") {
      setErrors({
        expenseName: expenseName === "",
        amount: amount === "",
        budgetCategory: budgetCategory === "",
      });
    } else {
      onAddExpense({ expenseName, amount: parseFloat(amount), budgetCategory });
      setExpenseName('');
      setAmount('');
      setBudgetCategory('');
      setErrors({ expenseName: false, amount: false, budgetCategory: false });
    }
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
        error={errors.expenseName}
        helperText={errors.expenseName ? "Expense Name is required" : ""}
      />
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., 3.50"
        error={errors.amount}
        helperText={errors.amount ? "Amount is required" : ""}
      />
      <TextField
        select
        label="Budget Category"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budgetCategory}
        onChange={(e) => setBudgetCategory(e.target.value)}
        error={errors.budgetCategory}
        helperText={errors.budgetCategory ? "Budget Category is required" : ""}
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