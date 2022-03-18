const URL_API = 'http://18.140.97.152/'

const BASE_URL = {
    authen : URL_API    + 'users/authenticate',
    authenWithGoogle : URL_API  + 'users/authenticatewithgoogle',
    getAccountForAdmin : URL_API + 'users/getuseraccountforadmin',
    admin : {
        getRole : URL_API + 'roles/getrole',
        updateRole : URL_API + 'users/updateuserrolebyadmin',
    },
    manager : {
        getListEvent : URL_API + 'events/getpageeventformanager',
        getEventDetail : URL_API + 'events/geteventdetailformanager',
        getGroupEvent : URL_API + 'groupevents/getpagegroupevent',
        getGEDetail : URL_API + 'groupevents/getgroupeventdetailformanager',
        createGroupEvent : URL_API + 'groupevents/creategroupevent',
        deleteGEvent : URL_API + 'groupevents/deletegroupevent',
        createEvent : URL_API + 'events/createevent',
        updateEvent : URL_API + 'events/updateevent',
        deleteEvent : URL_API + 'events/deleteevent',
        createEventContent : URL_API + 'eventcontents/addeventcontent',
        deleteEventContent : URL_API + 'eventcontents/deleteeventcontent',
        addEventRequest : URL_API +'eventrequests/addeventrequest',
        addGroupEventRequest : URL_API + 'eventrequests/addgroupeventrequest',
        getEventRequestList : URL_API + 'eventrequests/getpageeventrequestformanager',
        getEventRequestListforHM : URL_API + 'eventrequests/getpageeventrequestforheadmanager',
        getEventReqDetail : URL_API + 'eventrequests/geteventrequestdetail',
        updateEventRequest : URL_API + 'eventrequests/updateeventrequest',
        getUserList : URL_API + 'userevents/getlistuserevent',
        checkCode : URL_API + 'userevents/checkusercode',
        deleteUser : URL_API + 'userevents/deleteuserevent',
        updateUserInEvent : URL_API + 'userevents/updateuserevent'
    },
    user : {
        getEventList : URL_API + 'events/getlisteventpresent',
        getEventDetail : URL_API + 'events/geteventdetailforuser',
        regisEvent : URL_API + 'userevents/adduserevent',
        
        
    },
    images : URL_API + 'images/getimgfrompost',
    file : URL_API + 'images/getfilefrompost',
    planFileTemplate : URL_API + 'images/downloadfile',
    uploadImage : URL_API + 'images/uploadImg',
    uploadFile : URL_API + 'images/updateFile'

}

export default BASE_URL