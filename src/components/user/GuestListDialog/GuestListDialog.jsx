import { DialogContent } from "@material-ui/core";
import { Button, Dialog, DialogTitle, Divider, FormControl, MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import React, {useState, useRef } from "react";
import { useGuestListSearch } from "../../../hooks/useGuestListSearch";
import { getMessageCode } from "../../../utils/contanst";
import CheckPopup from "../CheckPopup/CheckPopup";

const GuestListDialog = (props) => {
  const { guestListDialog, setGuestListDialog } = props;
  const [checkPopup, setCheckPopup] = useState({
      isOpen: false,
      id : guestListDialog.id
  });
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const typingTimeoutRef = useRef(null);

  const columns = [
    {
      field: "user_id",
      headerName: "ID",
      width: 100,
      renderCell: (params) =>
        users.map((user) => user.user_id).indexOf(params.row.user_id) +
        1,
    },
    {
      field: "user_name",
      headerName: "User Name",
      width: 300,
      renderCell : params => {
        return (
          params.row.user.user_name
        )
      }
    },
    {
      field: "user_email",
      headerName: "User Email",
      width: 250,
      renderCell : params => {
        return (
          params.row.user.user_email
        )
      }
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      renderCell : params => {
        return (
            params.row.user.phone
            )
      }
    },
    {
      field: "date_create",
      headerName: "Date Register",
      width: 150,
      renderCell : params => {
       
        return (
            moment(`${params.row.date_create}`).format("DD-MMM-YYYY")
            )
      }
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell : (params) => {
          return (
              getMessageCode(params.row.status)
          )
      } 
    },
    
  ];


  const { users, loading, totalRow} = useGuestListSearch(searchName, pageSize, null,page,guestListDialog.id,2,guestListDialog.isOpen,checkPopup.isOpen)

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
  
  
  return (
      <>
    <Dialog
      fullWidth={true}
      maxWidth="lg"

      open={guestListDialog.isOpen}
      onClose={() =>
        setGuestListDialog({
          ...guestListDialog,
          isOpen: false,
        })
      }
      disableEnforceFocus
    >
      <DialogTitle>
        Guest List :
        <Divider />
      </DialogTitle>
      <DialogContent>

      <div
    style={{
      height: "500px",
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
      <input type="text" id="search-bar" placeholder="Search event by name" value={searchInput} onChange={(e) =>handleSearchNameChange(e)}/>
      {
          console.log('search input : ' + searchInput)
      }
      {
          console.log('search name : ' + searchName)
      }
      <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
  </form>
      </div>
      <div className="add-button">

      <Button color="primary" variant="contained" 
      onClick={()=> setCheckPopup({...checkPopup,isOpen:true})}
      >Check </Button>
      </div>
    </div>
    <DataGrid
      rowCount={totalRow}
      rows={users}
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
      getRowId={(row) => row.user_id}
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <h3>No result </h3>
          </Stack>
        ),
        NoResultsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
          No result 
          </Stack>
        ),
        LoadingOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            Loading users ....
          </Stack>
        ),
      }}
    />
  </div>
      </DialogContent>
    </Dialog>
    <CheckPopup setCheckPopup={setCheckPopup} checkPopup={checkPopup}/> 
    </>

  );
};

export default GuestListDialog;
