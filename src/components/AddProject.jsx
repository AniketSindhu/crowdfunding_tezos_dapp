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
/**
 * @param {{Tezos: TezosToolkit}}
 */
function AddProject({Tezos, handleClose, open }) {
  const [loading, setloading] = useState(false);

  
  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
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
          <Button onClick={handleClose}>Cancel</Button>
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
