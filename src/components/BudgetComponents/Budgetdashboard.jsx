import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';
import BudgetCard from './BudgetCard';

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);

  const handleCreateBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  const handleAddExpense = (newExpense) => {
    // Logic to add expense to a budget
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <BudgetForm onCreateBudget={handleCreateBudget} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ExpenseForm onAddExpense={handleAddExpense} budgetCategories={budgets.map(b => b.budgetName)} />
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom>
        Existing Budgets
      </Typography>

      <Grid container spacing={3}>
        {budgets.map((budget, index) => (
          <Grid item xs={12} md={6} key={index}>
            <BudgetCard budget={budget} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BudgetDashboard;
