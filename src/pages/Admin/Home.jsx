import React, { useEffect, useState, useRef } from "react";
import { getRoleForAdmin, searchAccount } from "../../services/account/account";
import { getMessageCode } from "../../utils/contanst";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, IconButton } from "@mui/material";
import UpdateRolePopup from "../../components/UpdateRolePopup/UpdateRolePopup";
import { useAccountSearch } from "../../hooks/useAccountSearch";

const Home = () => {
  const [searchName, setsearchName] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [status, setStatus] = useState(0);
  const [pageSizeOption, setPageSizeOption] = useState([5, 10, 15]);
  const [searchInput, setSearchInput] = useState("");
  const [openPopUp, setOpenPopUp] = useState(false);
  const typingTimeoutRef = useRef(null);
  const [userID,setUserID] = useState()

  useEffect(() => {
    
  },[openPopUp]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
      renderCell: (params) =>
        accounts.map((accounts) => accounts.id).indexOf(params.row.id) +
        1,
    },
    {
      field: "user_email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "user_name",
      headerName: "user Name",
      width: 240,
      // renderCell: (params) => {
      //   return (
      //     <div className="userListUser">
      //       <img
      //         className="userListImg"
      //         src={
      //           params.row.avata_url === null
      //             ? altAvatar
      //             : `${BASE_URL.getAvatar}/${params.row.avata_url}`
      //         }
      //         alt={altAvatar}
      //       />
      //       {params.row.user_real_name}
      //     </div>
      //   );
      // },
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      ortable: false,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
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
          <Tooltip title="Edit user role">
            <IconButton onClick={() => {setOpenPopUp(true) 
                                        setUserID(params.row.id)  
            }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  const { accounts, totalRow, loading } = useAccountSearch(
    searchName,
    status,
    pageSize,
    page,
    openPopUp
  );

  return (
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
      <DataGrid
        rowCount={totalRow}
        rows={accounts}
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
              Local filter returns no result
            </Stack>
          ),
          LoadingOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Loading account ....
            </Stack>
          ),
        }}
      />

      <UpdateRolePopup openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} userID={userID} />
    </div>
  );
};

export default Home;
