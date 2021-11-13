import { createStore, applyMiddleware } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import socket_middleware from "./middleware/socket"
import rootReducer from "./reducers"
import config from "../config"

const persist_config = {
	key: config().key,
	storage
}

const persisted_reducer = persistReducer(persist_config, rootReducer)

const store = createStore(
	persisted_reducer,
	composeWithDevTools(applyMiddleware(thunk, socket_middleware))
)
const persistor = persistStore(store)

export {
	store,
	persistor
}