import { combineReducers } from 'redux'
import DashboardReducer from './DashboardReducer'
import ChatReducer from './ChatReducer'
import UserReducer from './UserReducer'
import DisplayReducer from './DisplayReducer'

export default combineReducers({
  dashboard: DisplayReducer,
  user: UserReducer,
  chat: ChatReducer
})