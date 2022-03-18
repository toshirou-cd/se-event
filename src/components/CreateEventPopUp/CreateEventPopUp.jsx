import { useState } from "react";
import { DialogContent } from "@material-ui/core";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./CreateEventPopUp.css";
import React from "react";
import BASE_URL from "../../utils/Url";
import { createEvent } from "../../services/event/EventService";
import { useDispatch } from "react-redux";
import {
  notifyError,
  notifySuccessfully,
} from "../../redux/actions/notifyActions";
import { Box } from "@mui/system";
import moment from "moment";
import receiveMessageCode from "../../utils/messageCode";

const CreateEventPopUp = (props) => {
  const { popup, setPopup, groupEvents } = props;
  const [loading, setLoading] = useState(false);
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
    end : "",
    end_time: "",
    img: "",
    file: "",
    group_id: "",
  });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState({
    type : "",
    message : ""
  });
  // const [groupEvent, setGroupEvent] = useState([])

  const handleSave = () => {

    if(!data.name ) {
      setError({
        type: "Empty Name",
        message : "Event Name is required !"
      })
      return;
    } else if ( !data.start ) {
      setError({
        type: "Empty Start",
        message : "Start date is required !"
      })
      return;
    }
     else if ( !data.end ) {
      setError({
        type: "Empty End",
        message : "End date is required !"
      })
      return;
    }
     else if ( !data.start_join ) {
      setError({
        type: "Empty Start Join",
        message : "Start join date is required !"
      })
      return;
    }
     else if ( !data.end_join ) {
      setError({
        type: "Empty End Join",
        message : "End join date is required !"
      })
      return;
    }
     else if ( !data.img ) {
      setError({
        type: "Empty Img",
        message : "Image is required !"
      })
      return;
    }
     else if ( !data.file ) {
      setError({
        type: "Empty File",
        message : "File is required !"
      })
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("event_name", data.name);
    formData.append("description", data.des);
    formData.append(
      "date_start_join",
      moment(
        `${data.start_join},${data.start_join_time}`,
        // "YYYY-MM-DD HH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append(
      "date_end_join",
      moment(
        `${data.end_join},${data.end_join_time}`,
        "YYYY-MM-DD HH:mm:ss"
      ).format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append(
      "date_start_event",
      moment(`${data.start},${data.start_time}`,"YYYY-MM-DD HH:mm").format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append(
      "date_end_event",
      moment(`${data.end},${data.end_time}`,"YYYY-MM-DD HH:mm:ss").format("YYYY-MM-DDTHH:mm:ss")
    );
    formData.append("EventImg", data.img);
    formData.append("EventPlantFile", data.file);
    formData.append("groupevent_id", checked ? data.group_id : "");

    createEvent(
      // data.name,data.des,data.start_join,data.end_join,data.start,data.end,data.img,data.file,null
      formData
    )
      .then((res) => {
        if (res.statusCode === 200) {
          setData({
            name: "",
            des: "",
            start_join_time: "",
            start_join: "",
            end_join: "",
            end_join_time: "",
            start_time: "",
            end_time: "",
            img: null,
            file: null,
            group_id: "",
          });
          dispatch(notifySuccessfully("Created Event Success "));
          setPopup({ ...popup, isOpen: false });
        } else {
          dispatch(notifyError(receiveMessageCode(res.messageCode)));
          // setPopup({ ...popup, isOpen: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setLoading(false);
  };

  if (!groupEvents)
    return (
      <div>
        <Dialog
          open={popup.isOpen}
          onClose={() => setPopup({ ...popup, isOpen: false })}
          disableEnforceFocus
          fullWidth={true}
          maxWidth={"md"}
        >
          <DialogTitle>Loading...</DialogTitle>
        </Dialog>
      </div>
    );

  return (
    <Dialog
      open={popup.isOpen}
      onClose={() => setPopup({ ...popup, isOpen: false })}
      disableEnforceFocus
      fullWidth={true}
      maxWidth={"md"}
    >
      <DialogTitle>
        <span style={{ fontSize: "22px", fontWeight: "500" }}>
          Create Event
        </span>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <form enctype="multipart/form-data">
          <div className="content-wrapper">
          <label className="label">
              Is Group
              <input
                type="checkbox"
                label="Is group"
                style={{ marginLeft: "5px" }}
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </label>
          <div className="field-name">

         
            <Box
              sx={{
                maxWidth: 100,
                marginLeft: "5px",
              }}
            >
              <FormControl fullWidth>
                <Select
                  value={data.group_id}
                  label="Choose group event"
                  onChange={(e) =>
                    setData({ ...data, group_id: e.target.value })
                  }
                  variant="standard"
                  sx={{
                    ":before": { borderBottomColor: "black" },
                    ":after": { borderBottomColor: "black" },
                  }}
                  disabled={!checked}
                >
                  {groupEvents.map((GE) => (
                    <MenuItem value={GE.id} key={GE.id}>
                      {GE.group_name}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
            </div>
            <div className="label"> Event Name : </div>

            <div className="field-name">
              <TextField
              error={error.type=== "Empty Name"}
              helperText={error.type=== "Empty Name" && error.message}
                type="text"
                placeholder="event name"
                className="field-name"
                variant="standard"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="label"> Description: </div>
            <div className="field-name">
              <Input
              required
                type="text"
                placeholder="Description"
                className="field-name"
                value={data.des}
                onChange={(e) => setData({ ...data, des: e.target.value })}
              />
            </div>
            <div className="label"> Start from : </div>
            <TextField
            variant="standard"
              error={error.type === "Empty Start"}
              helperText={error.type === "Empty Start" && error.message}
              type="date"
              placeholder="day"
              value={data.start}
              onChange={(e) => setData({ ...data, start: e.target.value })}
            />
            <TextField
              type="time"
              variant="standard"
              error={error.type === "Empty Sta rt"}
              helperText={error.type === "Empty St art" && error.message}
              placeholder="day"
              value={data.start_time}
              onChange={(e) => setData({ ...data, start_time: e.target.value })}
            />
            <div className="label"> To : </div>
            <TextField
            variant="standard"
            error={error.type === "Empty End"}
            helperText={error.type === "Empty End" && error.message}
              type="date"
              placeholder="event name"
              value={data.end}
              onChange={(e) => setData({ ...data, end: e.target.value })}
            />
            <TextField
              type="time"
              variant="standard"
              placeholder="day"
              value={data.end_time}
              onChange={(e) => setData({ ...data, end_time: e.target.value })}
            />
            <div className="note">
             <span>
                * Date start event must be after date end join at least 1 day
               </span>
             <span>
             * An event must lasts at least 1 hours
               </span>
              </div>
            <div className="label"> Start Joining from: </div>
            <TextField
              type="date"
              variant="standard"
              error={error.type === "Empty Start Join"}
              helperText={error.type === "Empty Start Join" && error.message}
              placeholder="event name"
              value={data.start_join}
              onChange={(e) => setData({ ...data, start_join: e.target.value })}
            />
            <TextField
              type="time"
              variant="standard"
              placeholder="day"
              value={data.start_join_time}
              onChange={(e) =>
                setData({ ...data, start_join_time: e.target.value })
              }
            />
            <div className="label"> to : </div>
            <TextField
              type="date"
              placeholder="event name"
              variant="standard"
              error={error.type === "Empty End Join"}
              helperText={error.type === "Empty End Join" && error.message}
              value={data.end_join}
              onChange={(e) => setData({ ...data, end_join: e.target.value })}
            />
            <TextField
            variant="standard"
              type="time"
              placeholder="day"
              value={data.end_join_time}
              onChange={(e) =>
                setData({ ...data, end_join_time: e.target.value })
              }
            />
            <div className="note">
             <span>
                * Date start join must be after current date at least 5 days ( Ex: today is 17-3-2022 12:00 . Date start join should be 22-03-20222 14:00 )
               </span>
             <span>
             * Date end join must be after date start join at least 7 days ( Ex. Start join day is 22-03-20222 14:00, Date for end joining should be 29-03-2022 15:00)
                </span>
                {checked &&
                <span>
                * Group Event : Date start join must after date end event of the previous event at least 1 day 
                   </span>
                }
              </div>
            <div className="label"> Image : </div>
            <TextField
             variant="standard"
             error={error.type === "Empty Img"}
             helperText={error.type === "Empty Img" && error.message}
              type="file"
              className="field-name"
              onChange={(e) => setData({ ...data, img: e.target.files[0] })}
            />
            <div className="label"> Plan File : </div>
            <TextField
            variant="standard"
            error={error.type === "Empty File"}
            helperText={error.type === "Empty File" && error.message}
              type="file"
              className="field-name"
              onChange={(e) => setData({ ...data, file: e.target.files[0] })}
              accept=".xlsx, .xls, .csv"
            />
            <div className="label"> Get Plan File Template : </div>
            <a
              href={`${BASE_URL.planFileTemplate}`}
              download
              target="_blank"
              className="field-name"
            >
              {" "}
              Download
            </a>
            
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} disabled={loading}>
          {" "}
          Save
        </Button>
        <Button
          onClick={() => setPopup({ ...popup, isOpen: false })}
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

export default CreateEventPopUp;
