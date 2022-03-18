import AddIcon from "@mui/icons-material/Add";
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from "@mui/icons-material/Edit";
import { Button, Divider, IconButton } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import ContentPopup from "../../../components/Manager/ContentPopup";
import CreateEventRequestPopup from "../../../components/Manager/CreateEventRequest.jsx/CreateEventRequestPopup";
import MyEditor from "../../../components/MyEditor";
import GuestListDialog from "../../../components/user/GuestListDialog/GuestListDialog";
import {
  notifyError,
  notifySuccessfully
} from "../../../redux/actions/notifyActions";
import {
  createEventContent,
  deleteEventContent,
  getEventDetail,
  getGroupEventDetail,
  updateEvent
} from "../../../services/event/EventService";
import { getMessageCode } from "../../../utils/contanst";
import BASE_URL from "../../../utils/Url";
import "./EventDetail.css";
import receiveMessageCode from "../../../utils/messageCode";
import { TextField } from "@material-ui/core";


const EventDetail = (props) => {
  const [event, setEvent] = useState({});
  const [createEvent, setCreateEvent] = useState(false);
  const [content, setContent] = useState("");
  const [showContent, setShowContent] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupE, setGroupE] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen : false,
    title : "",
    subTitle : ""
  });
  const { eventId } = useParams();
  const [guestListDialog, setGuestListDialog] = useState({
    isOpen : false,
    id : eventId,
  });



  const downloadFile = (fileName) => {
    window.location.href = BASE_URL.file + "/" + fileName;
  };

  const [popup,setPopup] = useState({
    isOpen : false,
    isGroup : event.groupevent_id === null ? false : true
  })

  useEffect(() => {
    getEventDetail(eventId, 2).then((res) => {
      if (res.statusCode === 200) {
        setEvent(res.data);
    } else {
        setEvent(null);
      }
    });
  }, [createEvent, isEdit,loading,popup.isOpen,confirmDialog.isOpen]);

  useEffect(() => {
    if(event.groupevent_id !== null) {
      getGroupEventDetail(event.groupevent_id).then(res => {
        if(res.statusCode === 200) {
          setGroupE(res.data)
        } else {
          setGroupE(null)
        }
      })
    }
  },[event.groupevent_id])

  const handleOnchange = (e, editor) => {
    const data = editor.getData();
    setContent(data);
  };
  const dispatch = useDispatch();
  // handle add event
  const handleAddEventContent = () => {
    setLoading(true);
    createEventContent(eventId, content).then((res) => {
      if (res.statusCode === 200) {
        dispatch(notifySuccessfully("Added content !"));
        setCreateEvent(!createEvent);
      } else {
        dispatch(notifyError(receiveMessageCode(res.messageCode)));
      }
    });
    setLoading(false);
  };


  // handle update event 
  const handleUpdateEvent =() => {
    setLoading(true)
    const formData = new FormData()
    formData.append('Id',event.id)
    formData.append('event_name',event.event_name)
    formData.append('description',event.description)
    formData.append('date_start_join',event.date_start_join)
    formData.append('date_end_join',event.date_end_join)
    formData.append('date_start_event',event.date_start_event)
    formData.append('date_end_event',event.date_end_event)
    formData.append('EventImg',!event.event_img  ? null : event.event_img)
    formData.append('EventPlantFile',typeof event.event_plant_url === "string" ? null : event.event_plant_url)
    formData.append('groupevent_id',"")
    updateEvent(formData).then(res => {
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully("Updated Event !"))
      } else {
        dispatch(notifyError(receiveMessageCode(res.messageCode)))
      }
    })
    setLoading(false)
    setIsEdit(false)
  }


  //handle delete event content
  const handleDeleteContent = (id) => {
    setLoading(true)
    deleteEventContent(id).then(res => {
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully("Deleted Content !"))
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
      } else {
        dispatch(notifyError(receiveMessageCode(res.messageCode)))
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
      }
    })
    setLoading(!loading)
  }
  if (event === null) return <div className="loading">Loading... </div>;

  return (
    <div className="even-detail-containter">
      {/* <div className="img"> */}
      <img src={`${BASE_URL.images}/${event.event_img_url}`} className="img" />
      {/* </div> */}
      <div className="top-container">
        <textarea className="title" type="text" value={event.event_name} disabled={!isEdit} 
        onChange={(e) => setEvent({...event, event_name: e.target.value})}/>
        <textarea className="description" type="text" value={event.description} disabled={!isEdit} 
        onChange={(e) => setEvent({...event, description: e.target.value})}/>
        {
          (event.status ===10 ) && 
          <div className="top-button">
          {!isEdit ? (
            <IconButton onClick={() => setIsEdit(true)}>
              <EditIcon />
            </IconButton>
          ) : (
            <div>
              <Button variant="outlined" color="primary" size="small"
                  onClick={() => handleUpdateEvent()}            
                >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                sx={{ marginLeft: "5px" }}
                onClick={() => setIsEdit(false)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
        }
       
      </div>
      <Divider />
      <div className="info-containter">
        <div className="name-field">Date Start</div>
        <div style={{display:"flex", flexDirection:"row",gap:"0",padding:0}}>

        <input
          className="field"
          type="date"
          value={moment(event.date_start_event).format("yyyy-MM-DD")}
          onChange={(e) =>
            setEvent({ ...event, date_start_event: e.target.value })
          }
          disabled={!isEdit || event.groupevent_id !== null}
          />
        <input
          className="field"
          type="time"
          value={moment(event.date_start_event).format("HH:mm")}
          onChange={(e) =>
            setEvent( {
              ...event, date_start_event : moment(`${moment(event.date_start_event).format("yyyy-MM-DD")},${e.target.value}`).format("yyyy-MM-DD, HH:mm")  
            
          })
          }
          disabled={!isEdit || event.groupevent_id !== null}
          />
          </div>
        {/* {moment(event.date_start_event).format("DD-MMMM-YYYY")} */}
        {/* </input> */}
        {/* <div className="field">{moment(event.date_start_event).format("DD-MMMM-YYYY")}</div> */}
        <div className="name-field">Date End</div>
        <div style={{display:"flex", flexDirection:"row",gap:"0",padding:0}}>
        <input
          className="field"
          type="date"
          value={moment(event.date_end_event).format("yyyy-MM-DD")}
          onChange={(e) =>
            setEvent({ ...event, date_end_event: e.target.value })
          }
          disabled={!isEdit || event.groupevent_id !== null}
        />
        <input
          className="field"
          type="time"
          value={moment(event.date_end_event).format("HH:mm")}
          onChange={(e) =>
            setEvent( {
              ...event, date_end_event : moment(`${moment(event.date_end_event).format("yyyy-MM-DD")},${e.target.value}`).format("yyyy-MM-DD, HH:mm")  
            
          })
          }
          disabled={!isEdit || event.groupevent_id !== null}
          />
          </div>
        <div className="name-field">Start Joining</div>
        <div style={{display:"flex", flexDirection:"row",gap:"0",padding:0}}>
        <input
          className="field"
          type="date"
          value={moment(event.date_start_join).format("yyyy-MM-DD")}
          onChange={(e) =>
            setEvent({ ...event, date_start_join: e.target.value })
          }
          disabled={!isEdit || event.groupevent_id !== null}
        />
        <input
          className="field"
          type="time"
          value={moment(event.date_start_joint).format("HH:mm")}
          onChange={(e) =>
            setEvent( {
              ...event, date_start_join : moment(`${moment(event.date_start_join).format("yyyy-MM-DD")},${e.target.value}`).format("yyyy-MM-DD, HH:mm")  
            
          })
          }
          disabled={!isEdit || event.groupevent_id !== null}
          />
          </div>
        <div className="name-field">End Joining</div>
        <div style={{display:"flex", flexDirection:"row",gap:"0",padding:0}}>
        <input
          className="field"
          type="date"
          value={moment(event.date_end_join).format("yyyy-MM-DD")}
          onChange={(e) =>
            setEvent({ ...event, date_end_join: e.target.value })
          }
          disabled={!isEdit || event.groupevent_id !== null}
        />
        <input
          className="field"
          type="time"
          value={moment(event.date_end_join).format("HH:mm")}
          onChange={(e) =>
            setEvent( {
              ...event, date_end_join : moment(`${moment(event.date_end_join).format("yyyy-MM-DD")},${e.target.value}`).format("yyyy-MM-DD, HH:mm")  
            
          })
          }
          disabled={!isEdit || event.groupevent_id !== null}
          />
          </div>
        <div className="name-field">Create on : </div>
        <input
          className="field"
          type="date"
          value={moment(event.date_create).format("yyyy-MM-DD")}
          onChange={(e) => setEvent({ ...event, date_create: e.target.value })}
          disabled={!isEdit || event.groupevent_id !== null}
        />

        <div className="name-field">Update on : </div>
        <input
          className="field"
          type="date"
          value={moment(event.date_update).format("yyyy-MM-DD")}
          onChange={(e) => setEvent({ ...event, date_update: e.target.value })}
          disabled={!isEdit || event.groupevent_id !== null}
        />
      </div>
      <div className="detail">
        <div className="name-field">Status </div>
        <div className="field">{getMessageCode(event.status)}</div>
        <div className="name-field">Event Group Name :  </div>
        <div className="field">{groupE === null ? "-" : groupE.group_name}</div>
        <div className="name-field">Like numbers : </div>
        <div className="field">{event.likecount}</div>
        <div className="name-field">Comment numbers : </div>
        <div className="field">{event.comment_counts}</div>
        <div className="name-field">Event Img : </div>
        {
          isEdit ? 
          <input  className="field" type="file" onChange={(e) => setEvent({...event,event_img : e.target.files[0] })}/>
          :
          <img style={{width : '700px', height : '300px', objectFit : "contain", borderRadius : "10px"}} className="field" src={`${BASE_URL.images}/${event.event_img_url}`}/>
        }
        <div className="name-field">Detail </div>
        <div className="field"><Button 
            onClick={() => setGuestListDialog({
              isOpen: true,
              id : eventId
            })}        
        >Guest List</Button> </div>
        <div className="name-field">Detail </div>
        {
          isEdit ?
          <input type="file" className="field" onChange={(e) => setEvent({...event,event_plant_url : e.target.files[0] })}/>
          :

        <a
          className="field"
          style={{ border: "0.5px solid #f0f0f0", cursor: "pointer" }}
          // onClick={() => downloadFile(event.event_plant_url)}
          href={`${BASE_URL.file}/${event.event_plant_url}`}
          target="_blank"
          download
        >
          {event.event_plant_url}
        </a>
        }
        <div className="name-field">Event content : </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem",alignItems:"center"}}>
          {event.contents &&
            event.contents.map((data, id) => {
              return (
                <>
                <div
                  style={{
                    border: "1px solid gray",
                    padding: "1px 2px",
                    borderRadius: "2px",
                    color: "gray",
                    cursor: "pointer",
                    // position: "relative"
                    
                  }}
                  onClick={() => {
                    setShowContent(data.content);
                    setOpenPopup(true);
                  }}
                  >
                  Content {id + 1}
                </div>
                
                <div 
                style={{marginRight:"10px"}}
                >
                  <IconButton size="small" color="error" variant="outlined"
                    onClick={() => 
                      {
                        setConfirmDialog({
                          isOpen : true,
                          title : "Are you sure you want to delete this content ?",
                          subTitle : "Your operation can not be reversed !",
                          onConfirm : () => handleDeleteContent(data.id)
                        })
                      }
                      }
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
                
                  </>
              );
            })}
        </div>
      </div>

      <div className="create-content-wrapper">
        {createEvent ? (
          <div className="create-content">
            <MyEditor
              handleChange={(data) => {
                setContent(data);
                setShowContent(data);
              }}
              data={content}
              {...props}
            />
            {/* dangerouslySetInnerHTML={{ __html: content }}
             */}
            <div className="toolbuton">
              <Button
                onClick={() => setOpenPopup(true)}
                variant="outlined"
                color="primary"
              >
                Preview
              </Button>
              <Button
                variant="outlined"
                color="success"
                onClick={handleAddEventContent}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setCreateEvent(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div
            className="add-content-button"
            onClick={() => {
              setContent("");
              setCreateEvent(true);
            }}
          >
            <AddIcon /> Create Event Content
          </div>
        )}
      </div>
      <ContentPopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        content={showContent}
      />
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog}/> 
      {
        (event.status === 10 && event.groupevent_id === null) &&
      <div className="request-button">
        <Button variant="contained" 
          onClick={() => setPopup({isOpen: true, isGroup: event.groupevent_id === null ? false : true})}
          >
          Send Request
        </Button>
      </div>
      }
      <CreateEventRequestPopup popup={popup} setPopup={setPopup} event={event} />
      <GuestListDialog guestListDialog={guestListDialog} setGuestListDialog={setGuestListDialog} />
    </div>
  );
};

export default EventDetail;
