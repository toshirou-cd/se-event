import { DialogTitle } from "@material-ui/core";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EventComponent from "../../../components/EventComponent/EventComponent";
import { getGroupEventDetail } from "../../../services/event/EventService";
import { getMessageCode } from "../../../utils/contanst";
import CreateEventRequestPopup from "../../../components/Manager/CreateEventRequest.jsx/CreateEventRequestPopup";

import "./GroupEventDetail.css";


const GroupEventDetail = (props) => {
  const { popup, setPopup } = props;
  const [groupEvent, setGroupEvent] = useState(null);
  const [reqPopup,setReqPopup] = useState({
    isOpen : false,
    isGroup : true
  })

  useEffect(() => {
    if(popup.id !== "" ) {

      getGroupEventDetail(popup.id).then((res) => {
        if (res.statusCode === 200) {
          setGroupEvent(res.data);
        } else {
          setGroupEvent(null);
        }
      });
    }
  }, [popup.id,reqPopup.isOpen]);

  if (groupEvent === null || !groupEvent)
    return (
      <Dialog
        open={popup.isOpen}
        onClose={() => setPopup({ ...popup, isOpen: false })}
        disableEnforceFocus
        fullWidth={true}
        maxWidth={"md"}
        >
        <DialogTitle>Loading...</DialogTitle>
      </Dialog>
    );

  return (
    <>
    <Dialog
      open={popup.isOpen}
      onClose={() => setPopup({ ...popup, isOpen: false })}
      disableEnforceFocus
      fullWidth={true}
      maxWidth={"md"}
      >
      <DialogTitle>
        <span style={{ fontWeight: 600, fontSize: "24px" }}>
          Group event detail
        </span>
      </DialogTitle>
      <DialogContent>
        <div className="top-info">
          <div className="info">
            <div className="label">Group Name : </div>
            <div className="name">{groupEvent.group_name}</div>
            <div className="label">Status : </div>
            <div className="name">{getMessageCode(groupEvent.status)}</div>
            <div className="label">Date create : </div>
            <div className="name">
              {moment(groupEvent.date_create).format("DD-MMM-yyyy")}
            </div>
            <div className="label">Date update : </div>
            <div className="name">
              {moment(groupEvent.date_update).format("DD-MMM-yyyy")}
            </div>
          </div>
          <div className="event-child">
            {groupEvent.events !== null
              ? groupEvent.events.map((evt) => (
                <Link to={`event/${evt.id}`} target="_blank">
                    <EventComponent event={evt} />
                  </Link>
                ))
              : "There is no event"}
            <EventComponent />
          </div>
          
        </div>
      </DialogContent>
      <DialogActions>
            <Button
              variant="contained"
              onClick={() => setReqPopup({...reqPopup,isOpen: true})}
              disabled={(groupEvent.events === null || groupEvent.status !== 11) ? true : false}
              >
              Send Request
            </Button>
      </DialogActions>
    </Dialog>
    <CreateEventRequestPopup popup={reqPopup} setPopup={setReqPopup} event={groupEvent}/>
    </>
  );
};

export default GroupEventDetail;
