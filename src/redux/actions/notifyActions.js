import { NOTIFY_DELETE_SUCCESSFULLY, CLOSE_NOTIFY,FORCE_LOG_OUT, NOTIFY_ERROR,
     NOTIFY_UPDATE_SUCCESSFULLY, 
     NOTIFY_CREATE_CONTEST_SUCCESSFULLY,
     NOTIFY_SUCCESSFULLY} from "../../utils/types";


import React from 'react'

export const notifyDeleteSucessFully = () => {
    return {
        type : NOTIFY_DELETE_SUCCESSFULLY
    }
}
export const closeNotify = () => {
    return {
        type : CLOSE_NOTIFY
    }
}
export const forceLogoutSuccess = () => {
    return {
        type : FORCE_LOG_OUT
    }
}
export const notifyError = () => {
    return {
        type : NOTIFY_ERROR
    }
}
export const notifyUpdateSucessfully = () => {
    return {
        type : NOTIFY_UPDATE_SUCCESSFULLY
    }
}
export const notifyCreateContestSuccessfully = () => {
    return {
        type : NOTIFY_CREATE_CONTEST_SUCCESSFULLY
    }
}
export const notifySuccessfully = (content) => {
    return {
        type : NOTIFY_SUCCESSFULLY,
        payload : content
    }
}

