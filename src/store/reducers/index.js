import { combineReducers } from "redux"
import DisplayReducer from "./DisplayReducer"
import UserReducer from "./UserReducer"
import ChatReducer from "./ChatReducer"
import ChannelUsersReducer from "./ChannelUsers"

export default combineReducers({
	dashboard: DisplayReducer,
	user: UserReducer,
	chat: ChatReducer,
	ch_usrs: ChannelUsersReducer
})