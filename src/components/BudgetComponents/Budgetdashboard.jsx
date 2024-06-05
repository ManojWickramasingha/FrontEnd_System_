import React, { useState } from 'react';
import { Container, Grid, Typography, Dialog, DialogActions, Button } from '@mui/material';
import BudgetForm from './BudgetForm';
import ExpenseForm from './ExpenseForm';
import BudgetCard from './BudgetCard';
import BudgetDetails from './BudgetDetails';

const BudgetDashboard = () => {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleCreateBudget = (newBudget) => {
    setBudgets([...budgets, { ...newBudget, expenses: [] }]);
  };

  const handleAddExpense = (newExpense) => {
    setBudgets(budgets.map(budget => {
      if (budget.budgetName === newExpense.budgetCategory) {
        return {
          ...budget,
          expenses: [...budget.expenses, { expenseName: newExpense.expenseName, amount: newExpense.amount }]
        };
      }
      return budget;
    }));
  };

  const handleViewDetails = (budget) => {
    setSelectedBudget(budget);
  };

  const handleCloseDetails = () => {
    setSelectedBudget(null);
  };

  const handleDeleteBudget = () => {
    setBudgets(budgets.filter(budget => budget !== selectedBudget));
    setIsDeleteDialogOpen(false);
    handleCloseDetails();
  };

  const handleOpenDeleteDialog = (budget) => {
    setSelectedBudget(budget);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
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
            <BudgetCard 
              budget={budget} 
              onViewDetails={handleViewDetails} 
              onDelete={() => handleOpenDeleteDialog(budget)}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={!!selectedBudget} onClose={handleCloseDetails}>
        {selectedBudget && (
          <BudgetDetails 
            budget={selectedBudget} 
            onClose={handleCloseDetails} 
            onDelete={() => handleOpenDeleteDialog(selectedBudget)}
          />
        )}
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <Typography variant="h6" style={{ padding: '20px' }}>
          Are you sure you want to delete this budget?
        </Typography>
        <DialogActions>
          <Button 
          style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: 'red'}}
            variant="contained" 
            color="secondary" 
            onClick={handleDeleteBudget}
          >
            Yes
          </Button>
          <Button 
          style={{ backgroundColor: '#f7f0f0', textTransform: 'none', fontSize: '16px', color: '#07271F'}}
            variant="contained" 
            onClick={handleCloseDeleteDialog}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BudgetDashboard;
