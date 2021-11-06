import { combineReducers } from "redux"
import DashboardReducer from "./DashboardReducer"
import UserReducer from "./UserReducer"
import ChatReducer from "./ChatReducer"
import ChannelUsersReducer from "./ChannelUsers"

export default combineReducers({
	dashboard: DashboardReducer,
	user: UserReducer,
	chat: ChatReducer,
	ch_usrs: ChannelUsersReducer
})