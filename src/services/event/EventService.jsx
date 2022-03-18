import { axiosApiInstance } from "../auth/authService";
import BASE_URL from "../../utils/Url";
import axios from "axios";
import { JoinFull } from "@mui/icons-material";
import { Redirect } from "react-router-dom";

export const getEventList = ( q,pageSize,statuss,page,date_up,date_down) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getListEvent,
        {
            params : {
                searchname : q,
                limitEvent : pageSize,
                status : statuss,
                currentPage : page,
                date_up : date_up,
                date_down : date_down
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event list : " + err)
    })
}
export const getEventListForUser = ( q,limitEven,date_up,date_down) =>  {
    return axiosApiInstance.get(BASE_URL.user.getEventList,
        {
            params : {
                searchname : q,
                limitEven : limitEven,
                date_up : date_up,
                date_dow : date_down
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event list for user : " + err)
    })
}
export const getGroupEventList = ( q,pageSize,statuss,page,date_up,date_down) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getGroupEvent,
        {
            params : {
                searchname : q,
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
        console.log("err when getting group event list : " + err)
    })
}

export const getGroupEventDetail = (id) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getGEDetail,
        {
            params : {
                groupId : id
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting group event detail : " + err)
    })
}



export const getEventDetail = ( id, numberofComments) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getEventDetail,
        {
            params : {
                eventId : id,
                limitComment : numberofComments
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event detail : " + err)
    })
}
export const getEventDetailForUser = ( id, numberofComments) =>  {
    return axiosApiInstance.get(BASE_URL.user.getEventDetail,
        {
            params : {
                eventId : id,
                limitComment : numberofComments
            }
    })
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting event detail for user : " + err)
    })
}


export const axiosApiInstanceForFile = axios.create();

// Request interceptor for API calls
axiosApiInstanceForFile.interceptors.request.use(
  async (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type" : `multipart/form-data`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosApiInstanceForFile.interceptors.response.use(response => {
  return response;
}, error => {
 if (error.response.status === 401) {
   console.log('looi cmrn')
   
  return <Redirect to='/login' />
 }
 return error;
});

export const createEvent = (
    // name,des,date_start_join,end_join,start,end,img,plan_file,group_id
    formData
    ) =>  {
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
    return axiosApiInstance.post(BASE_URL.manager.createEvent,
        
            formData
            
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when creating event  : " + err)
    })
}

export const createGEvent = (
    // name,des,date_start_join,end_join,start,end,img,plan_file,group_id
    name
    ) =>  {
        // for (var key of formData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }
    return axiosApiInstance.post(BASE_URL.manager.createGroupEvent,
        {
            Name : name
        }    
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when creating group event  : " + err)
    })
}
export const deleteGEvent = (
    id
    ) =>  {
    return axiosApiInstance.post(BASE_URL.manager.deleteGEvent  ,
        {
            groupevent_id : id
        }    
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when deleting group event  : " + err)
    })
}
export const updateEvent = (
    // name,des,date_start_join,end_join,start,end,img,plan_file,group_id
    formData
    ) =>  {
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }
    return axiosApiInstance.post(BASE_URL.manager.updateEvent,
        
            formData
            
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when updating event  : " + err)
    })
}
export const deleteEvent = (
    event_id
    ) =>  {
    return axiosApiInstance.post(BASE_URL.manager.deleteEvent,
        {
            event_id : event_id
        }
            
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when deleting event  : " + err)
    })
}
export const createEventContent = (id,content) =>  {
    return axiosApiInstance.post(BASE_URL.manager.createEventContent,
        {
            event_id : id,
            content : content   
        }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when creating event content   : " + err)
    })
}
export const deleteEventContent = (id) =>  {
    return axiosApiInstance.post(BASE_URL.manager.deleteEventContent,
        {
            Id : id,
            status : 4  
        }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when delete event content   : " + err)
    })
}
export const regisEvent = (id,type) =>  {
    return axiosApiInstance.post(BASE_URL.user.regisEvent,
        {
            event_id : id,
            type : type   
        }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when regis user event    : " + err)
    })
}

export const getUserList = (searchName,pageSize,status,page, id,type) =>  {
    return axiosApiInstance.get(BASE_URL.manager.getUserList,{
        params:
        {
            searchname : searchName,
            limitUser: pageSize,
            status : status,
            currentPage : page,
            eventId : id,
            type : type   
        }
    }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when getting user list in  event    : " + err)
    })
}
export const checkCode = (userCode,eventID) =>  {
    return axiosApiInstance.get(BASE_URL.manager.checkCode,{
        params:
        {
           userCode : userCode,
           eventId : eventID
        }
    }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when check user code: " + err)
    })
}
export const removeUserEvent = (user_id,event_id) =>  {
    return axiosApiInstance.post(BASE_URL.manager.deleteUser,
        {
            user_id : user_id,
            event_id : event_id,
           type : 0
        }
    
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when remove user from event : " + err)
    })
}
export const updateUserEvent = (user_id,event_id,status) =>  {
    return axiosApiInstance.get(BASE_URL.manager.updateUserInEvent,{
        params : 
        {
            userId : user_id,
            eventId : event_id,
            status : status
        }
    }
    )
    .then((res) => {
        return res.data
    }).catch(err => {
        console.log("err when remove user from event : " + err)
    })
}