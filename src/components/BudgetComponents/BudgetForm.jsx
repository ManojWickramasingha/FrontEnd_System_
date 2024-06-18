import React, { useState } from "react";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const FormContainer = styled(Box)({
  border: "1px dashed #ccc",
  padding: "20px",
  borderRadius: "10px",
  marginBottom: "20px",
});

const BudgetForm = ({ onCreateBudget }) => {
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ budgetName: false, amount: false });

  const handleCreateBudget = () => {
    if (budgetName === "" || amount === "") {
      setErrors({
        budgetName: budgetName === "",
        amount: amount === "",
      });
    } else {
      onCreateBudget({ budgetName, amount: parseFloat(amount) });
      setBudgetName("");
      setAmount("");
      setErrors({ budgetName: false, amount: false });
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5">Create budget</Typography>
      <TextField
        label="Budget Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={budgetName}
        onChange={(e) => setBudgetName(e.target.value)}
        placeholder="e.g., Groceries"
        error={errors.budgetName}
        helperText={errors.budgetName ? "Budget Name is required" : ""}
      />
      <TextField
        label="Amount"
        variant="outlined"
        fullWidth
        margin="normal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g., $350"
        error={errors.amount}
        helperText={errors.amount ? "Amount is required" : ""}
      />
      <Button
        style={{
          backgroundColor: "#07271F",
          textTransform: "none",
          marginTop: "10px",
          fontSize: "16px",
        }}
        variant="contained"
        color="primary"
        onClick={handleCreateBudget}
      >
        Create Budget
      </Button>
    </FormContainer>
  );
};

export default BudgetForm;