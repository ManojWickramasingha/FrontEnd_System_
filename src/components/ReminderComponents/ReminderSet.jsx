import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { DialogContentText } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ReminderSet({ open, setOpen, rdate }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          console.log("This is popup open");
          handleClose();
        },
      }}
    >
      <DialogTitle>Set Reminder</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Date"
            value={rdate}
            type="text"
            fullWidth
            disabled
            variant="standard"
          />
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Reminder Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="amount"
          name="amount"
          label="Payment Amount"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          required
          margin="dense"
          id="desc"
          name="desc"
          label="Description"
          type="text"
          multiline
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button type="submit" sx={{ fontWeight: "bold" }}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
}
