import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface CustomDialogProps {
  open: boolean;
  onClose?(): void;
  title?: string;
  message?: string;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  title,
  onClose,
  message,
}) => {
  const handleCloseCallback = React.useCallback(() => {
    //@ts-ignore
    onClose();
  }, [onClose]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleCloseCallback}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCallback}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CustomDialog;
