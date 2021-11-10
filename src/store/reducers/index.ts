import { combineReducers } from "redux"
import DashboardReducer from "./DashboardReducer"
import UserReducer from "./UserReducer"
import ChatReducer from "./ChatReducer"
import ChannelUsersReducer from "./ChannelUsers"
import UserFriendsReducer from "./UserFriendsReducer"

export default combineReducers({
	dashboard: DashboardReducer,
	user: UserReducer,
	friends: UserFriendsReducer,
	chat: ChatReducer,
	ch_usrs: ChannelUsersReducer
})