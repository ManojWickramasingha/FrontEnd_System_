import React from 'react';
import { CardContent, Typography, Box, Button, DialogContent, DialogActions } from '@mui/material';

const BudgetDetails = ({ budget, onClose }) => {
  const spent = budget.expenses.reduce((total, expense) => total + expense.amount, 0);
  const remaining = budget.amount - spent;

  return (
    <>
      <DialogContent sx={{ width: '600px', height: '600px' }}>
        <Typography variant="h4" color="textSecondary" sx={{fontWeight:'bold'}}>
          {budget.budgetName} Details
        </Typography>
        <Box mt={2}>
          <Typography variant="h6" sx={{color:'black'}}>Total Budgeted: ${budget.amount.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{color:'red'}}>Total Spent: ${spent.toFixed(2)}</Typography>
          <Typography variant="h6" sx={{color:'green'}}>Remaining: ${remaining.toFixed(2)}</Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="h5">{budget.budgetName} Expenses:</Typography>
          {budget.expenses.map((expense, index) => (
            <Typography key={index} variant="body1"sx={{fontSize:'20px'}}>
              {expense.expenseName}   $  {expense.amount.toFixed(2)}
            </Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button 
          variant="contained" 
          color="primary"   
          style={{ backgroundColor: '#07271F', textTransform: 'none' , marginTop: '10px', fontSize: '16px'}}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </>
  );
};

export default BudgetDetails;