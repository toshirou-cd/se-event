import { Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect , useState, useRef} from 'react'
import { useEventSearch } from '../../../hooks/useEventSearch'
import moment from "moment"
import { getMessageCode } from '../../../utils/contanst'
import './Event.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import { PopperUnstyled } from '@mui/base'
import CreateEventPopUp from '../../../components/CreateEventPopUp/CreateEventPopUp'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteEvent, deleteGEvent, getGroupEventList } from '../../../services/event/EventService'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import { useGroupEventSearch } from '../../../hooks/useGroupEventSearch'
import CreateGEPopup from '../../../components/CreateGEPopup/CreateGEPopup'


const Event = (props) => {
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const typingTimeoutRef = useRef(null);
  const [GE,setGE] = useState([])

  


  const [openPopUp, setOpenPopUp] = useState(false);
  const [userID,setUserID] = useState()
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen : false,

    title : "",
    subTitle : ""
    ,
  })




  const [popup,setPopup] = useState({
    isOpen:false,
  })

  useEffect(() => {
    getGroupEventList(null,10,0,1,null,null) 
        .then((res) => {
            if (res.statusCode === 200 ) {
                console.log('events ' + JSON.stringify(res.data))
                setGE(res.data)
            } else {
                setGE([])
            }
        })
        .catch((err) => {
            console.log('err' + err)
        })
  },[])
  
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) =>
        events.map((events) => events.id).indexOf(params.row.id) +
        1,
    },
    {
      field: "event_name",
      headerName: "Event Name",
      width: 230,
    },
    {
      field: "date_start_event",
      headerName: "Start",
      width: 150,
      renderCell : params => {
        return (
          moment(params.row.date_start_event).format("YYYY-MMM-DD")
        )
      }
    },
    {
      field: "date_end_event",
      headerName: "End",
      width: 150,
      renderCell : params => {
        return (
          moment(params.row.date_end_event).format("YYYY-MMM-DD")
        )
      }
    },
    {
      field: "groupevent_id",
      headerName: "Is Group",
      width: 200,
      renderCell : params => {
       
        return (
            params.row.groupevent_id === null ? "----" :  (
              // console.log('loi o day ' + GE.find(x => x.id === params.row.groupevent_id).group_name)
              "yes"
              )
              )
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      sortable: false,
      renderCell: (params) => {
        return <>{getMessageCode(params.row.status)}</>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <>
          <Link to={`${props.match.url}/${params.row.id}`}>
            <Button 
            // onClick={() => {setOpenPopUp(true) 
            //                             setUserID(params.row.id)  
            // }}
            >
              Detail
            </Button>
              </Link>
              {
               ( params.row.status === 10 ) &&
                <IconButton color="error" onClick={() => {
                  setConfirmDialog({
                    isOpen: true,
                    title : "Are you sure you want to delete this event ?",
                    subTitle : "Your operation can not be reversed !",
                    onConfirm : () => handleDeleteEvent(params.row.id)
                  })
                }}>
                  <RemoveCircleOutlineIcon /> 
                </IconButton>
                
              }
              </>
        );
      },
    },
  ];
  
    
  const { events, loading, totalRow} = useEventSearch(searchName, pageSize, status,page,popup.isOpen,confirmDialog)
  // const {groupEvents,loadingGE,totalGERow} = useGroupEventSearch(null,10,0,1, popup,confirmDialog)
  
 

  // handle search 
  const handleSearchNameChange = (e) => {
    setSearchInput(e.target.value)
    
    if( typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setsearchName(e.target.value)
    },300)
  }

  


  //handle select status 
  const handleSelectStatus = (e) => {
    setStatus(e.target.value)
  }
  

  const dispatch = useDispatch()

  //handle delete event 
  const handleDeleteEvent = (id) => {
    // setLoading(true)
    deleteEvent(id).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Delete event successfully !"))
      } else {
        dispatch(notifyError(getMessageCode(res.messageCode)))
      }
    })
    setConfirmDialog({
      ...confirmDialog,
      isOpen : false
    })
  }

 
  if(GE.group_name === null) return (
  <div>
    Loading ....
  </div>
  )

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
      <Box sx={{
          maxWidth : 100,
          marginLeft: '5px',
        }}> 
          <FormControl fullWidth>
              
              <Select
                  value={status}
                  label="Status"
                  onChange={handleSelectStatus}
                  variant="standard"
                  sx={{
                    ':before': { borderBottomColor: 'black' },
                    ':after': { borderBottomColor: 'black' },
                  }}
                  s
                  >
                  <MenuItem value={0}> All</MenuItem>
                  <MenuItem value={3}> Present</MenuItem>
                  <MenuItem value={4}> Deleted</MenuItem>
                  <MenuItem value={12}>Processing</MenuItem>
                  <MenuItem value={11}>Closed</MenuItem>
                  <MenuItem value={10}>Draft</MenuItem>
                  {/* <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem> */}
              </Select>
          </FormControl>
        </Box>
      </div>
      <div className="searchBar">
      <form class="search-container">
      <input type="text" id="search-bar" placeholder="Search event by name" value={searchInput} onChange={handleSearchNameChange}/>
      <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
  </form>
      </div>
      <div className="add-button">

      <Button color="primary" variant="contained" onClick={()=> setPopup({...popup,isOpen:true})}>Add </Button>
      </div>
    </div>
    <DataGrid
      rowCount={totalRow}
      rows={events}
      columns={columns}
      pageSize={pageSize}
      page={page - 1}
      rowsPerPageOptions={pageSizeOption}
      checkboxSelection
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
            <h3>No result finding reported post</h3>
          </Stack>
        ),
        NoResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
          No result finding reported post
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
   
  <CreateEventPopUp popup={popup} setPopup={setPopup} groupEvents={GE} />
  <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
      </>
  )
} 

export default Event