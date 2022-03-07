import { axiosApiInstance } from "../auth/authService";
import BASE_URL from "../../utils/Url";
import axios from "axios";
import { JoinFull } from "@mui/icons-material";
import { Redirect } from "react-router-dom";

export const getEventReqManagerList = (q ,pageSize,statuss,page,date_up,date_down) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getEventRequestList,
        {
            params : {
                searchString : q,
                productPerPage : pageSize,
                requestStatus : statuss,
                currentPage : page,
                date_up : date_up,
                date_down : date_down
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event requests for manager  : " + err)
    })
}
export const getEventReqHeadManagerList = (q ,pageSize,statuss,page,date_up,date_down) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getEventRequestListforHM,
        {
            params : {
                searchString : q,
                productPerPage : pageSize,
                requestStatus : statuss,
                currentPage : page,
                date_up : date_up,
                date_down : date_down
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event requests for manager  : " + err)
    })
}
export const addEventRequeset = (id,description) =>  {
    return axiosApiInstance.post(BASE_URL.manager.addEventRequest,
        {
            event_id : id,
            description : description
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when adding event request   : " + err)
    })
}
export const addGroupEventRequeset = (id,description) =>  {
    return axiosApiInstance.post(BASE_URL.manager.addGroupEventRequest,
        {
            groupevent_id : id,
            description : description
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when adding group event request   : " + err)
    })
}

export const updateRequest = (id,status) => {
    return axiosApiInstance.post(BASE_URL.manager.updateEventRequest,{
        Id : id,
        status : status
    }).then(res => {
        return res.data
    }).catch(err => {
        console.log("err when update request status : " + err)
    })
}
