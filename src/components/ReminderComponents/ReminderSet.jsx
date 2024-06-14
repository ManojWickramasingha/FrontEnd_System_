import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { DialogContentText } from "@mui/material";
import moment from "moment";

const ReminderSet = ({ open, setOpen, rdate, addEvent }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const newEvent = {
      start: moment(rdate).toDate(),
      end: moment(rdate).toDate(),
      title: formJson.name,
      amount: formJson.amount,
      description: formJson.desc,
    };

    addEvent(newEvent);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
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
        <Button onClick={handleClose} sx={{ fontWeight: "bold" }}>
          Cancel
        </Button>
        <Button type="submit" sx={{ fontWeight: "bold" }}>
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderSet;
