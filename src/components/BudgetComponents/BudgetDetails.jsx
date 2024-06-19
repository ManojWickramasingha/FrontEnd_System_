import React, { useState } from "react";
import {
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const BudgetDetails = ({ budget, onClose }) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState({
    budgetName: budget.budgetName,
    amount: budget.budgetAmount,
    description: budget.budgetDescription,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBudget((prevBudget) => ({
      ...prevBudget,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    setIsUpdateDialogOpen(true);
  };

  const handleSaveClick = () => {
    // Here you can add logic to save the updated budget to your backend or state
    console.log("Updated budget:", updatedBudget);
    setIsUpdateDialogOpen(false);
  };

  const handleCloseUpdateDialog = () => {
    setIsUpdateDialogOpen(false);
  };

  // const spent = budget.expenses.reduce(
  //   (total, expense) => total + expense.amount,
  //   0
  // );
 

  return (
    <>
      <DialogContent sx={{ width: "600px", height: "600px" }}>
        <Typography
          variant="h4"
          color="textSecondary"
          sx={{ fontWeight: "bold" }}
        >
          {budget.budgetName} Details
          <Typography variant="body1">{budget.budgetDescription}</Typography>
        </Typography>
        <Box mt={1}>
          <Typography variant="h6" sx={{ color: "black" }}>
            Total Budgeted: ${budget.budgetAmount.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ color: "red" }}>
            Total Spent: ${budget.spent.toFixed(2)}
          </Typography>
          <Typography variant="h6" sx={{ color: "green" }}>
            Remaining: ${budget.remain.toFixed(2)}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography variant="h5">{budget.budgetName} Expenses:</Typography>
          {budget.expenses.map((expense, index) => (
            <Typography key={index} variant="body1" sx={{ fontSize: "20px" }}>
              {expense.bExpenseName} $ {expense.bExpenseAmount.toFixed(2)}
            </Typography>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#07271F",
            textTransform: "none",
            marginTop: "10px",
            fontSize: "16px",
          }}
          onClick={handleUpdateClick}
        >
          Update Budget
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#07271F",
            textTransform: "none",
            marginTop: "10px",
            fontSize: "16px",
          }}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>

      <Dialog open={isUpdateDialogOpen} onClose={handleCloseUpdateDialog}>
        <DialogContent>
          <TextField
            name="budgetName"
            label="Budget Name"
            value={updatedBudget.budgetName}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
          />
          <TextField
            name="description"
            label="Description"
            value={updatedBudget.description}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            name="amount"
            label="Amount"
            value={updatedBudget.amount}
            onChange={handleInputChange}
            variant="outlined"
            type="number"
            InputProps={{
              inputProps: { min: 0, step: "0.01" },
            }}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#07271F",
              textTransform: "none",
              marginTop: "10px",
              fontSize: "16px",
            }}
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#07271F",
              textTransform: "none",
              marginTop: "10px",
              fontSize: "16px",
            }}
            onClick={handleCloseUpdateDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BudgetDetails;
