import { combineReducers } from 'redux'
import CheckInReducer from './checkin'
export default combineReducers({
    checkIn: CheckInReducer
})