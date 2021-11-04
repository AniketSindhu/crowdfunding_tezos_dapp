import {
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

function AddProject(props) {
  const [loading, setloading] = useState(false);
  return (
    <Dialog open={props.open} onClose={props.handleClose} fullWidth>
      <DialogTitle>
        <b>Add Project</b>
      </DialogTitle>
      <form>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Project Name"
            variant="standard"
            fullWidth
            margin="normal"
          />
          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            multiline
            minRows={3}
            fullWidth
            margin="normal"
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="standard-basic"
              label="Amount (in tez)"
              variant="standard"
              margin="normal"
            />
            <TextField
              id="standard-basic"
              label="Duration (in days)"
              variant="standard"
              margin="normal"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <LoadingButton
            onClick={() => {
              setloading(true);
            }}
            variant="contained"
            loading={loading}
          >
            Create
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddProject;
