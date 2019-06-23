import { CHECK_IN } from "../action/action";


const initialState = {
  checkInRoomNo: ""
}

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECK_IN:
      return {
        ...state,
          checkInRoomNo: action.payload.roomNo
      }
    default:
      return state
  }
}