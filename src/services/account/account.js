import BASE_URL from "../../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../auth/authService";
import { KeyboardReturnSharp } from "@mui/icons-material";

export const searchAccount = (q,statuss,pageSize,page,roleID) => {
  return axiosApiInstance
    .get(BASE_URL.getAccountForAdmin, {
      params: {
        searchName: q,
        status: statuss,
        limituser: pageSize,
        currentPage: page,  
        roleId : roleID
      },
      
    })
    .then((res) => {
      // if( res.data.statusCode === 200) {
        return res.data;  
      // }
      // return res.data
    }).catch(err => {
      if(axios.isCancel(err)) return
      console.log('error when getting account list :' + err)
    });
};
export const getRoleForAdmin = () => {
  return axiosApiInstance
    .get(BASE_URL.admin.getRole, {
      params: {
      },
      
    })
    .then((res) => {
        return res.data;
    }).catch(err => {
      console.log('error when getting role list :' + err)
    });
};

export const updateUserRole = (userID,roleId) => {
  return axiosApiInstance
    .post(BASE_URL.admin.updateRole, {
        user_id : userID,
        RoleId : roleId
      
    })
    .then((res) => {
        return res.data;
    }).catch(err => {
      console.log('error when updating role  :' + err)
    });
};


