import React, { useState } from "react";
import { DialogContent } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  Input,
} from "@mui/material";
import { createGEvent } from "../../services/event/EventService";
import { useDispatch } from "react-redux";
import { notifyError, notifySuccessfully } from "../../redux/actions/notifyActions";
const CreateGEPopup = (props) => {
  const { createGEPopup, setCreateGEPopup } = props;
  const [loading, setLoading] = useState(false);
  const [GEtext, setGEtext] = useState("");

    const dispatch = useDispatch()

  //handle create GE
  const handleCreateGe = () => {
      setLoading(true)
      createGEvent(GEtext).then(res => {
          if(res.statusCode === 200) {
              dispatch(notifySuccessfully("Created Group Event !"))
              setCreateGEPopup({...createGEPopup,isOpen:false})
          } else {
              dispatch(notifyError())
              setCreateGEPopup({...createGEPopup,isOpen:false})
          }
      })
      setLoading(false)
  }

  return (
    <Dialog
      open={createGEPopup.isOpen}
      onClose={() => setCreateGEPopup({ ...createGEPopup, isOpen: false })}
      disableEnforceFocus
      fullWidth={true}
      maxWidth={"sm"}
    >
      <DialogTitle>
        <span style={{ fontSize: "22px", fontWeight: "500" }}>
          Create Group Event
        </span>
      </DialogTitle>
      <Divider />
      <DialogContent>
            <Input type="text" placeholder="Group event name" fullWidth value={GEtext} onChange={(e) => setGEtext(e.target.value)}/>
            
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreateGe} disabled={loading}> Save</Button>
        <Button
          onClick={() => setCreateGEPopup({ ...createGEPopup, isOpen: false })}
          color="error"
          disabled={loading}
        >
          {" "}
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGEPopup;
