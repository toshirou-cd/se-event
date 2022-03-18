import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./CreateEventRequest.css";
import { useDispatch } from "react-redux";
import { addEventRequeset, addGroupEventRequeset } from "../../../services/event/EventRequestService";
import { notifyError, notifySuccessfully } from "../../../redux/actions/notifyActions";
import { getMessageCode } from "../../../utils/contanst";

const CreateEventRequestPopup = (props) => {
  const { popup, setPopup,event } = props;
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    des: "",
    start_join: "",
    start_join_time: "",
    end_join: "",
    end_join_time: "",
    start: "",
    start_time: "",
    end_time: "",
    img: "",
    file: "",
    group_id: "",
  });

  // handle send request
  const handleSendRequest = () => {
      setLoading(true)
      console.log('isGroup ? : ' + popup.isGroup)
      if(popup.isGroup) {
        addGroupEventRequeset(event.id,description).then(res => {
            if(res.statusCode === 200) {
                dispatch(notifySuccessfully("Sended request !"))
                setPopup({...popup,isOpen:false})
            } else {
                dispatch(notifyError(getMessageCode(res.messageCode)))
                setPopup({...popup,isOpen:false})
                
            }
          })
      } else {
          addEventRequeset(event.id,description).then(res => {
              if(res.statusCode === 200) {
            dispatch(notifySuccessfully("Sended request !"))
            setPopup({...popup,isOpen:false})
        } else {
            dispatch(notifyError(getMessageCode(res.messageCode)))
            setPopup({...popup,isOpen:false})
            
        }
      })
    }
      setLoading(false)
    }
    
    return (
        <Dialog
        open={popup.isOpen}
      onClose={() => setPopup({ ...popup, isOpen: false })}
      disableEnforceFocus
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>Create event request</DialogTitle>
      <DialogContent>
        <div className="field-container">
          <div className="label"> 
          {
              !popup.isGroup ? "Event Name : " : "Group Event Name : "
          }
          </div>

          <div className="field-name">
              <span
                className="field-name"
              > 
              {
                  !popup.isGroup ?
              event.event_name :
              event.group_name
              }
              </span>
          </div>

          <div className="label"> Description: </div>
          <div className="field-name">
            <Input
              type="text"
              placeholder="Description"
              className="field-name"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
          <Button onClick={handleSendRequest} disabled={loading}>Send </Button>
          <Button onClick={() => setPopup({...popup,isOpen:false})} color="error" disabled={loading}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEventRequestPopup;
