import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress, Button } from '@mui/material';
import { styled } from '@mui/system';

const BudgetCardContainer = styled(Card)(({ theme }) => ({
  margin: '20px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  border: `1px solid ${theme.palette.divider}`,
}));

const BudgetCard = ({ budget, onViewDetails, onDelete }) => {

  // const spent = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
  // const remaining = budget.amount - spent;

  return (
    <BudgetCardContainer sx={budget.remain < 0 && {border: '5px solid red'}}>
      <CardContent>
        <Typography variant="h6" color="textSecondary">
          {budget.budgetName}
        </Typography>
        <Typography variant="h5" component="div">
          ${budget.budgetAmount.toFixed(2)} Budgeted
        </Typography>
        <LinearProgress variant="determinate" value={(1000 / budget.amount) * 100} />
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography color="textSecondary">${budget.spent} spent</Typography>
          <Typography color="textSecondary">${budget.remain} remaining</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button 
            variant="contained" 
            color="primary"   
            style={{ backgroundColor: '#07271F', textTransform: 'none', fontSize: '16px'}}
            onClick={() => onViewDetails(budget)}
          >
            View Details
          </Button>
          <Button 
          
            variant="contained" 
            color="secondary"   
            style={{ backgroundColor: '#faeae8', textTransform: 'none', fontSize: '16px', color: 'red'}}
            onClick={() => onDelete(budget)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </BudgetCardContainer>
  );
};

export default BudgetCard;