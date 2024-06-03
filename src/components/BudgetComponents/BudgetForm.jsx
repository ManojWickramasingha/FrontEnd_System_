import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled(Box)({
  border: '1px dashed #ccc',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px'
});

const BudgetForm = ({ onCreateBudget }) => {
  const [budgetName, setBudgetName] = useState('');
  const [amount, setAmount] = useState('');

  const handleCreateBudget = () => {
    onCreateBudget({ budgetName, amount: parseFloat(amount) });
    setBudgetName('');
    setAmount('');
  };

  return (
    <FormContainer>
      <Typography variant="h6">Create budget</Typography>
      <TextField
        label="Budget Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budgetName}
        onChange={(e) => setBudgetName(e.target.value)}
        placeholder="e.g., Groceries"
      />
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., $350"
      />
      <Button
      style={{ backgroundColor: '#111C1D', }}
        variant="contained"
        color="primary"
        onClick={handleCreateBudget}
      >
        Create budget
      </Button>
    </FormContainer>
  );
};

export default BudgetForm;
