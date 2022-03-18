import { CLOSE_NOTIFY, FORCE_LOG_OUT, NOTIFY_CREATE_CONTEST_SUCCESSFULLY, NOTIFY_DELETE_SUCCESSFULLY, NOTIFY_ERROR, NOTIFY_SUCCESSFULLY, NOTIFY_UPDATE_SUCCESSFULLY } from "../../utils/types";



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
export const notifyError = (message) => {
    return {
        type : NOTIFY_ERROR,
        payload : message
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

