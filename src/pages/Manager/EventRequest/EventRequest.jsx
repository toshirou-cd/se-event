import { Button } from "@material-ui/core";
import CheckIcon from "@mui/icons-material/Check";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box, FormControl,
  IconButton, MenuItem,
  Select,
  Stack
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog.js";
import { useEventRequestSearch } from "../../../hooks/useEventRequestsManagerSearch.jsx";
import { notifyError, notifySuccessfully } from "../../../redux/actions/notifyActions.js";
import { updateRequest } from "../../../services/event/EventRequestService.jsx";
import { getMessageCode } from "../../../utils/contanst.js";
import receiveMessageCode from "../../../utils/messageCode";
import GroupEventDetail from "../GroupEventDetail/GroupEventDetail.jsx";

const EventRequest = (props) => {
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const typingTimeoutRef = useRef(null);
  // const [popup, setPopup] = useState({
  //   isOpen: false,
  //   isGroup: false,
  // });
  const [popup,setPopup] = useState({
    isOpen : false,
    id : ""
})
  const dispatch = useDispatch()
  const [confirmDialog,setConfirmDialog] = useState({
    isOpen : false,
    title : "",
    subTitle : ""
  })
  // handle accept request
  const handleAcceptRequest = (id) =>{
    updateRequest(id,2).then(res => {
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully("Accepted Request "))
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
      } else {
        dispatch(notifyError(receiveMessageCode(res.messageCode)))
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
      }
    }).catch(err =>{
      dispatch(notifyError(receiveMessageCode(err)))
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
    })

  }

   // handle reject request
   const handleRejectRequest = (id) =>{
    updateRequest(id,6).then(res => {
      if(res.statusCode === 200) {
        dispatch(notifySuccessfully("Rejected Request "))
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
      } else {
        dispatch(notifyError(receiveMessageCode(res.messageCode)))
        setConfirmDialog({
          ...confirmDialog,
          isOpen: false
        })
      }
    })
  }
  const columns = [
    {
      field: "request_id",
      headerName: "ID",
      width: 20,
      renderCell: (params) =>
        eventRequests
          .map((reqs) => reqs.request_id)
          .indexOf(params.row.request_id) + 1,
    },
    {
      field: "user_email",
      headerName: "Request user",
      width: 170,
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
    },
    {
      field: "groupevent_id",
      headerName: "Group Event",
      width: 100,
      renderCell: (params) => {
        if(params.row.groupevent_id === null) {
          return "No";
        } else {
          return "Yes";
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return getMessageCode(params.row.status);
      },
    },
    {
      field: "date_create",
      headerName: "Request Date",
      width: 120,
      renderCell: (params) => {
        return moment(params.row.date_create).format("DD-MMM-yyyy");
      },
    },
    {
      field: "date_accept",
      headerName: "Accept date",
      width: 120,
      renderCell: (params) => {
        if (params.row.date_accept === null) {
          return "---";
        } else {
          return moment(params.row.date_accept).format("DD-MMM-yyyy");
        }
      },
    },
    {
      field: "event_id",
      headerName: "Event Detail",
      width: 150,
      renderCell : params => {
        return (
          params.row.groupevent_id === null ?

          <Link to={`${props.match.url}/${params.row.event_id}`} target="_blank">
        <Button>
            Detail
        </Button>
        </Link> 
           :
          

            <Button 
            onClick={() => {
              // handleClickDetail(params.row.id)
              setPopup({isOpen : true,id:params.row.groupevent_id})
            }}
            >
          Detail
        </Button>
          
        )
    }

    },
    {
      field: "Action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          (!params.row.date_accept && role === "HeadManager" )&& (
            <>
              <IconButton 
              onClick={() => setConfirmDialog({
                isOpen: true,
                title : "Are you sure you want to accept this request ?",
                subTitle : "Your operation cannot be reversed !",
                onConfirm : () => handleAcceptRequest(params.row.request_id)
              })}
              >
                <CheckIcon color="success" />
              </IconButton>
              <IconButton
                onClick={() => setConfirmDialog({
                  isOpen: true,
                  title : "Are you sure you want to reject this request ?",
                  subTitle : "Your operation cannot be reversed !",
                  onConfirm : () => handleRejectRequest(params.row.request_id)
                })}
              >
                <HighlightOffIcon color="error" />
              </IconButton>
            </>
          )
        );
      },
    },
  ];
  const role = JSON.parse(localStorage.getItem("user")|| "{}").role

  const { eventRequests, loading, totalRow } = useEventRequestSearch(
    searchName,
    pageSize,
    status,
    page,
    confirmDialog.isOpen,
    role
  );

  const handleSearchNameChange = (e) => {
    setSearchInput(e.target.value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setsearchName(e.target.value);
    }, 300);
  };
  return (
    <>
      
      <div
        style={{
          height: "80%",
          width: "100%",
          backgroundColor: "white",
          padding: "0 10 0 10",
          display: "flex",
          flexDirection: "column",
          borderRadius: "5px",
        }}
      >
        <div className="header">
          <div className="title-show"> Showing events by : </div>
          <div className="tool">
            <Box
              sx={{
                maxWidth: 100,
                marginLeft: "5px",
              }}
            >
              <FormControl fullWidth>
                <Select
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                  variant="standard"
                  sx={{
                    ":before": { borderBottomColor: "black" },
                    ":after": { borderBottomColor: "black" },
                  }}
                  s
                >
                  <MenuItem value={0}> All</MenuItem>
                  <MenuItem value={1}> Request</MenuItem>
                  <MenuItem value={2}> Accpepted</MenuItem>
                  <MenuItem value={6}> Rejected</MenuItem>
                  {/* <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem> */}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div className="searchBar">
            <form class="search-container">
              <input
                type="text"
                id="search-bar"
                placeholder="Search request by description"
                value={searchInput}
                onChange={handleSearchNameChange}
              />
              <a href="#">
                <img
                  class="search-icon"
                  src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                />
              </a>
            </form>
          </div>
          {/* <div className="add-button">
            <Button
              color="primary"
              variant="contained"
              // onClick={() => setPopup({ ...popup, isOpen: true })}
              id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
            >
             Create {" "}
            </Button>
            <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> setPopup({isOpen:true, isGroup: false})}>Event Request</MenuItem>
        <MenuItem onClick={()=> setPopup({isOpen:true, isGroup: true})}>Group Event Request</MenuItem>
      </Menu>
          </div> */}
        </div>
        <DataGrid
          rowCount={totalRow}
          rows={eventRequests}
          columns={columns}
          pageSize={pageSize}
          page={page - 1}
          rowsPerPageOptions={pageSizeOption}
          checkboxSelection
          getRowId={(r) => r.request_id}
          // className={style.rowSelected}
          disableSelectionOnClick={true}
          pagination
          paginationMode="server"
          onPageChange={(page) => setPage(page + 1)}
          onPageSizeChange={(size) => setPageSize(size)}
          loading={loading}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                <h3>No result finding request</h3>
              </Stack>
            ),
            NoResultsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                No result finding request
              </Stack>
            ),
            LoadingOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Loading account ....
              </Stack>
            ),
          }}
        />
      </div>
      <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      <GroupEventDetail popup={popup} setPopup={setPopup} />
    </>
  );
};

export default EventRequest;
