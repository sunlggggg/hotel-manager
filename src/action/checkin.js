import { CHECK_IN } from './action';
export default function checkInAction(roomNo) {
    console.log('postAction')
    return async function (dispatch) {
        dispatch({
            type: CHECK_IN,
            payload: { roomNo: roomNo }
        })
    }
}