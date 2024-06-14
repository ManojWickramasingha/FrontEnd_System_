import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import moment from "moment";

const ReminderDetail = ({ event, open, setOpen, onDelete }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm" 
      fullWidth  
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>Reminder Details</DialogTitle>
      <DialogContent>
        {event ? (
          <>
            <Typography variant="h6">Name: {event.title}</Typography>
            <Typography variant="h6">Date: {moment(event.start).format('YYYY-MM-DD')}</Typography>
            <Typography variant="h6">Amount: {event.amount}</Typography>
            <Typography variant="body1">Description: {event.description}</Typography>
          </>
        ) : (
          <Typography variant="body1">No event selected</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ fontWeight: "bold", color: '#07271F' }}>
          Close
        </Button>
        <Button
          onClick={() => {
            onDelete();
            handleClose();
          }}
          sx={{ fontWeight: "bold" }}
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDetail;