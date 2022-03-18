import BASE_URL from "../../utils/Url";
import axios from "axios";
import { axiosApiInstance } from "../auth/authService";


export const getAvatar = (fileName) => {
    return axios
    .post(BASE_URL.getAvatar, {
        params: {
        fileName : fileName
      }})
    .then((res) => {
        return res
    }).catch((err) => {
        console.log("img err !!" + err)
    })
}
export const uploadFile = (form) => {
    return axiosApiInstance
    .post(BASE_URL.uploadFile, 
       form
      )
    .then((res) => {
        return res.data
    }).catch((err) => {
        console.log("upload template err!!" + err)
    })
}

