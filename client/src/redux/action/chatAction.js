import * as actionTypes from "../Constant/chatConstant";

export const setChatRooms = (user, message) => async (dispatch) => {
   dispatch({
       type: actionTypes.SET_CHATROOMS,
       payload: {
           user: user,
           message: message,
       }
   }) 
}