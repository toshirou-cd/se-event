import { Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Tooltip } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect , useState, useRef} from 'react'
import { useEventSearch } from '../../../hooks/useEventSearch'
import moment from "moment"
import { getMessageCode } from '../../../utils/contanst'
import '../Event/Event.css'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom'
import { PopperUnstyled } from '@mui/base'
import CreateEventPopUp from '../../../components/CreateEventPopUp/CreateEventPopUp'

import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { deleteEvent, deleteGEvent, getGroupEventDetail } from '../../../services/event/EventService'
import { useDispatch } from 'react-redux'
import { notifyError, notifySuccessfully } from '../../../redux/actions/notifyActions'
import ConfirmDialog from '../../../components/ConfirmDialog/ConfirmDialog'
import { useGroupEventSearch } from '../../../hooks/useGroupEventSearch'
import CreateGEPopup from '../../../components/CreateGEPopup/CreateGEPopup'
import GroupEventDetail from '../GroupEventDetail/GroupEventDetail'

const GroupEvent = (props) => {

    const [searchGEName, setsearchGEName] = useState("");
  const [pageGE, setPageGE] = useState(1);
  const [pageSizeGE, setPageSizeGE] = useState(5);
  const [statusGE, setStatusGE] = useState(0);
  const [pageSizeOptionGE, setPageSizeOptionGE] = useState([5, 10, 15]);
  const [searchInputGE, setSearchInputGE] = useState("");
  const typingTimeoutRefGE = useRef(null);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen : false,

    title : "",
    subTitle : ""
    ,
  })
  const [createGEPopup,setCreateGEPopup] = useState({
    isOpen:false,
  })
  const [popup,setPopup] = useState({
      isOpen : false,
      id : ""
  })

//   const [groupEvent, setGroupEvent] = useState({});

//   //handle click GE detail
//   const handleClickDetail = (id) => {
//     getGroupEventDetail(id).then((res) => {
//       if (res.statusCode === 200) {
//         setGroupEvent(res.data);
//       } else {
//         setGroupEvent(null);
//       }
//     });
//   }

  // handle search  GE
  const handleSearchNameChangeGE = (e) => {
    setSearchInputGE(e.target.value)
    
    if( typingTimeoutRefGE.current) {
      clearTimeout(typingTimeoutRefGE.current)
    }
    
    typingTimeoutRefGE.current = setTimeout(() => {
      setsearchGEName(e.target.value)
    },300)
  }
  //handle select status for GE
  const handleSelectStatusGE = (e) => {
    setStatusGE(e.target.value)
  }

  const dispatch = useDispatch()
   //handle delete event 
   const handleDeleteGEvent = (id) => {
    // setLoading(true)
    deleteGEvent(id).then(res => {
      if(res.statusCode === 200) {
        setConfirmDialog({
          ...confirmDialog,
          isOpen : false
        })
        dispatch(notifySuccessfully("Delete Group event successfully !"))
      } else {
        dispatch(notifyError())
      }
    })
    setConfirmDialog({
      ...confirmDialog,
      isOpen : false
    })
  }

    const GEcolumns = [
        {
          field: "id",
          headerName: "ID",
          width: 100,
          renderCell: (params) =>
            groupEvents.map((gevents) => gevents.id).indexOf(params.row.id) +
            1,
        },
        {
          field: "group_name",
          headerName: "Group event name",
          width: 350,
        },
        {
          field: "numberof_event",
          headerName: "Number of event",
          width: 150,
        },
        {
          field: "date_create",
          headerName: "Create On ",
          width: 150,
          renderCell: (params) => (
            moment(params.row.date_create).format('DD-MMM-yyyy')
          ),
        },
        {
          field: "date_update",
          headerName: "Create On ",
          width: 150,
          renderCell: (params) => (
            moment(params.row.date_update).format('DD-MMM-yyyy')
          ),
        },
        {
          field: "status",
          headerName: "Status",
          width: 150,
          renderCell: (params) => (
            getMessageCode(params.row.status)
          ),
        },
        {
          field: "Action",
          headerName: "Detail",
          width: 150,
          renderCell: (params) => (
            <>
            {/* <Link to={`${props.match.url}/${params.row.id}`}> */}
                <Button 
                onClick={() => {
                    // handleClickDetail(params.row.id)
                    setPopup({isOpen : true,id:params.row.id})
                }}
                >
                  Detail
                </Button>
                  {/* </Link> */}
                  {
                   ( params.row.status ===10 )  &&
                    <IconButton color="error" onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title : "Are you sure you want to delete this group event ?",
                        subTitle : "Child event will be deleted as well !",
                        onConfirm : () => handleDeleteGEvent(params.row.id)
                      })
                    }}>
                      <RemoveCircleOutlineIcon /> 
                    </IconButton>
                    
                  }
                  </>
          ),
        },
      ]
      const {groupEvents,loadingGE,totalGERow} = useGroupEventSearch(searchGEName,pageSizeGE,statusGE,pageGE, createGEPopup,confirmDialog)
  
      if(!groupEvents) return <div>Loading....</div>
  
  
  
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
      marginTop : "2rem"
    }}
  >
    <div className="header">
      <div className="title-show"> Showing group events by : </div>
      <div className="tool">
      <Box sx={{
          maxWidth : 100,
          marginLeft: '5px',
        }}> 
          <FormControl fullWidth>
              
              <Select
                  value={statusGE}
                  label="Status"
                  onChange={handleSelectStatusGE}
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
                  {/* <MenuItem value={5}> Inactivate</MenuItem>
                  <MenuItem value={9}> Blocking</MenuItem> */}
              </Select>
          </FormControl>
        </Box>
      </div>
      <div className="searchBar">
      <form class="search-container">
      <input type="text" id="search-bar" placeholder="Search groups event by name" value={searchInputGE} onChange={handleSearchNameChangeGE}/>
      <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
  </form>
      </div>
      <div className="add-button">

      <Button color="primary" variant="contained" onClick={()=> setCreateGEPopup({...createGEPopup,isOpen:true})}>Create </Button>
      </div>
    </div>
    <DataGrid
      rowCount={totalGERow}
      rows={groupEvents}
      columns={GEcolumns}
      pageSize={pageSizeGE}
      page={pageGE - 1}
      rowsPerPageOptions={pageSizeOptionGE}
      checkboxSelection
      // className={style.rowSelected}
      disableSelectionOnClick={true}
      pagination
      paginationMode="server"
      onPageChange={(page) => setPageGE(page + 1)}
      onPageSizeChange={(size) => setPageSizeGE(size)}
      loading={loadingGE}
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
  <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
  <CreateGEPopup createGEPopup={createGEPopup} setCreateGEPopup={setCreateGEPopup}/> 
  <GroupEventDetail popup={popup} setPopup={setPopup} />
  </>
  )
}

export default GroupEvent