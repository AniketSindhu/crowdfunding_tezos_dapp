import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";

function AddProject(props) {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Set backup account</DialogTitle>
      Hi what you doin?
    </Dialog>
  );
}

export default AddProject;
