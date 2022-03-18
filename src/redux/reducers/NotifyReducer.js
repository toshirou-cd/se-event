import { CLOSE_NOTIFY, FORCE_LOG_OUT, NOTIFY_DELETE_SUCCESSFULLY, NOTIFY_ERROR, NOTIFY_SUCCESSFULLY } from "../../utils/types";

const initialState = {
  isOpen: false,
  message: "",
  type: "",
};

export const NotifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_DELETE_SUCCESSFULLY:
      return {
        isOpen: true,
        message: "Deleted successfully !",
        type: "success",
      }
    case CLOSE_NOTIFY:
      return {
          ...state,
          isOpen: false,
        }
    case FORCE_LOG_OUT : 
      return {
      isOpen : true,
      message : 'Force Logout Success',
      type :'success'
    }

    case NOTIFY_ERROR : 
      return {
        isOpen : true,
        message : action.payload,
        type :'error'
    }
    case NOTIFY_SUCCESSFULLY : 
        return {
          isOpen : true,
          message : action.payload
        }    
    default:
      return state;
  }
};
