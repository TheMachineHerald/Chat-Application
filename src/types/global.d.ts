import { HttpRequestHeader } from "antd/lib/upload/interface"
import React, { Dispatch, MouseEventHandler, ReactElement, SetStateAction } from "react"
import { StateFromReducersMapObject } from "redux"
import { RequestInit } from "axios"
import { BackTopProps } from "antd"
import { Selector } from "react-redux"
import { ValidateErrorEntity } from "rc-field-form/lib/interface"

declare global {
    declare module '*.scss'

    /**
     * APPLICATION TYPES
     */
        type STATUS_CODE = number
        type _Error = Error
        type _ValidateErrorEntity<T> = ValidateErrorEntity
    /** ---------------------------------------------------------------------- */
    /**
    * [Websocket Instance]
    */
        interface WebRTC_Client {}

        interface CLIENT_QUERY_PARAMS {
            id: number
            user_name: string
        }

        interface SOCKET_OPTIONS {
            url: string
            ping_timeout: number
            pong_timeout: number
            reconnect_timeout: number
        }

        interface SOCKET_OPTIONS_EXT extends SOCKET_OPTIONS {
            ping_message: string
            repeat_limit: null | number
        }
    /** ---------------------------------------------------------------------- */
    /**
     * Socket Middleware
     */
        interface HANDLER_MESSAGE<Payload> extends MessageEvent {
            event: string
            payload: <Payload>() => any
            state: StateFromReducersMapObject
            socket: WebSocket
            dispatch: Dispatch
            userService: any
            channelService: any
        }

        interface CLIENT_USER_PAYLOAD {
            id: number
            user_name: string
            first_name: string
            last_name: string
            email: string
            status: number
            home_selected: boolean
            selected_friend_id: number
            selected_friend_user_name: string
            selected_server_id: number
            selected_channel_id: number
            servers: Array<SERVER>
        }

        interface CLIENT_SOCKET_OPEN_MESSAGE {
            event: string
            payload: CLIENT_USER_PAYLOAD
        }

        interface SAVE_SELECTED_CHANNEL_MESSAGE {
            event: string
            payload: SAVE_SELECTED_CHANNEL_PAYLOAD
        }

        interface UPDATE_SELECTED_SERVER_PAYLOAD {
            selected_server_id: number
            selected_channel_id: number
        }

        interface UPDATE_SELECTED_SERVER_MESSAGE {
            event: string
            payload: UPDATE_SELECTED_SERVER_PAYLOAD
        }

        interface USER_MESSAGE_SENT_PAYLOAD {
            user_id: number
            friend_id: number
            message: string
        }

        interface USER_MESSAGE_SENT_MESSAGE {
            event: string
            payload: USER_MESSAGE_SENT_PAYLOAD
        }

        interface CHANNEL_MESSAGE_SENT_PAYLOAD {
            user: Object<{ id: number; user_name: string; message: string }>
            channel_id: number
            server_id: number
        }

        interface CHANNEL_MESSAGE_SENT_MESSAGE {
            event: string
            payload: CHANNEL_MESSAGE_SENT_PAYLOAD
        }

        interface POPULATE_USER_FRIENDS_MESSAGE {
            event: string
            payload: Array<CHANNEL_USER>
        }

    //Event Handler Interfaces
        interface SAVE_SELECTED_CHANNEL_PAYLOAD {
            selected_channel_id: number | string
            selected_channel_name: string
            id: number
        }

        interface SOCKET_CLOSE_PLAYLOAD {
            event: string
            payload: Object<{}>
        }

        interface CONNECTED_USER_PAYLOAD {
            id: number
            user_name: string
            first_name: string
            last_name: string
            email: string
            status: number
            selected_server_id: number
            selected_channel_id: number
        }

        interface CONNECTED_USER_MESSAGE {
            event: string
            payload: CONNECTED_USER_PAYLOAD
        }

        interface PONG_PAYLOAD {
            event: string
            payload: null
        }

        interface UPDATE_CHANNEL_MESSAGES_MESSAGE {
            event: string
            payload: Object<{}>
        }

        interface UPDATE_SELECTED_CHANNEL_MESSAGE {
            selected_channel_id: null | number
            selected_channel_name: string
            id: number
        }

        interface USER_LOGOUT_MESSAGE {
            event: string
            payload: Object<{}>
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [Login]
     */
        interface LOGIN_FORM {
            email: string
            password: string
        }

        interface LOGIN_ROUTE_PAYLOAD {
            user: CHAT_USER
            servers: Array<SERVER>
            selected_server: SELECTED_SERVER
        }

        interface LOGIN_ROUTE_RESPONSE {
            message: string
            payload: LOGIN_ROUTE_PAYLOAD
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [Register]
     */
        interface REGISTER_FORM {
            first_name: string
            last_name: string
            email: string
            user_name: string
            password: string
        }

        interface REGISTER_REQUEST {
            first_name: string
            last_name: string
            user_name: string
            email: string
            password: string
        }

        interface REGISTERED_USER extends CHAT_USER {
            email: string
            passwrd: string
        }

        interface REGISTER_ROUTE_PAYLOAD {
            user: REGISTERED_USER
            servers: Array<SERVER>
            selected_server: SELECTED_SERVER
        }

        interface REGISTER_ROUTE_RESPONSE {
            message: string
            payload: REGISTER_ROUTE_PAYLOAD
        }

        interface REGISTERED_USER extends REGISTER_ROUTE_PAYLOAD {
            authdata: string
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [SidePanel]
     */

    /** ---------------------------------------------------------------------- */
    /**
     * [SidePanelChannel]
     */
        interface SIDE_PANEL_CHANNEL_PROPS {
            id: number
            user_id: number
            channel: string
            is_selected: number
            type: string
        }

        interface SIDE_PANEL_CHANNEL_REQUEST {
            selected_server_id: number
            channel_id: number
            user_id: number
        }

        interface SIDE_PANEL_CHANNEL_MESSAGE_RESPONSE {
            channels: _CHANNELS
            payload: Object<{ messages: CHANNEL_MESSAGES }>
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [FriendsContainer]
     */


    /** ---------------------------------------------------------------------- */
    /**
     * [SidePanelUser]
     */
        interface SIDE_PANEL_USER_PROPS {
            user_id: number
            friend_id: number
            friend_user_name: string
            is_selected: boolean
        }

        interface SIDE_PANEL_USER_REQUEST {
            user_id: number
            friend_id: number
            friend_user_name: string
        }

        interface SIDE_PANEL_USER_MESSAGE_RESPONSE {
            selected_friend: Object<{ selected_friend_id: number; selected_friend_user_name: string }>
        }
    /** ---------------------------------------------------------------------- */

    /**
     * [Profile]
     */
        interface PROFILE_SETTINGS_STATE {
            settingsVisible: boolean
            set_settings_visible: (T: boolean) => void
        }

        interface PROFILE_COMPONENT_PROPS {
            user: USER_STATE
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [SettingsModal]
     */
        interface SETTINGS_MODAL_PROPS {
            visible: boolean
            onCancel: MouseEventHandler
        }

        interface SETTINGS_MODAL_RIGHT_COMPONENT_PROPS {
            toggle: MouseEventHandler
    }
    /** ---------------------------------------------------------------------- */
    /**
     * [Server]
     */
        interface SERVER_COMPONENT_PROPS {
            id: number
            name: string
            user_id: number
        }

        interface SERVER_REQUEST {
            user_id: number
            server_id: number
            server_name: string
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [Chat]
     */
        interface USER_LIST_STATE {
            userList: boolean
            set_user_list: (T: boolean) => void
        }

        interface CHAT_CONTEXT {
            user_list: USER_LIST_STATE
        }

        interface SAVE_USER_MESSAGE_REQUEST {
            user_id: number
            user_name: string
            friend_id: number
            friend_user_name: string
            message: string
        }

        interface USER_MESSAGE_PAYLOAD {
            user_id: number
            user_name: string
            friend_id: number
            friend_user_name: string
            message: string
        }

        interface USER_MESSAGE_EVENT {
            event: string
            payload: USER_MESSAGE_PAYLOAD
        }

        interface CHANNEL_MESSAGE_PAYLOAD {
            user: Object<{ id: string; user_name: string; message: string }>
            channel_id: number
            server_id: number
        }

        interface CHANNEL_MESSAGE_EVENT {
            event: string
            payload: CHANNEL_MESSAGE_PAYLOAD
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [User]
     */
        interface USER_COMPONENT_PROPS {
            user: CHANNEL_USER
        }
    /** ---------------------------------------------------------------------- */
    /**
     *  [Message]
     */
        interface MESSAGE_COMPONENT_PROPS {
            user: string
            date: string
            message: string
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [ChatHeader] 
     */
    /** ---------------------------------------------------------------------- */
    /**
     * [Left]
     */
    /** ---------------------------------------------------------------------- */
    /**
     * [Redux]
     */
        interface CHANNEL {
            id: number
            channel_id: number
            channel_name: string
            server_id: number
            server_name: string
            user_id: number
            user_name: string
            created_date: string
            type: string
            is_selected: number
        }

        interface CHANNELS {
            text: Array<CHANNEL>
            voice: Array<CHANNEL>
        }

        interface CHANNEL_USER {
            id: number
            user_name: string
            first_name: string
            last_name: string
            email: string
            status: number
        }

        interface CHANNEL_MESSAGES {
            id: number
            channel_id: number
            server_id: number
            user_id: number
            user_name: string
            message: string
            created_date: string
        }

        interface SERVER {
            server_id: number
            server_name: string
            created_by_user_id: number
        }

        interface SELECTED_SERVER_RESPONSE {
            server_id: number | null
            server_name: string
            selected_channel_id: number | null
            selected_channel_name: string
            channels: Object<CHANNELS>
        }

        interface SAVE_HOME_SELECTED_MESSAGE {
            event: string
            payload: Object<{ home_selected: boolean }>
        }
        
        //User Reducer
        interface USER_STATE {
            id: null | number
            logged_in: boolean
            user_name: string
            first_name: string
            last_name: string
            email: string
            status: string | number
            home_selected: boolean
            home_page: boolean
            page_selection: string
            selected_friend_id: number
            selected_friend_user_name: string
            selected_server_id: null | number
            selected_channel_id: null | number
            selected_server_name: string
            session_token: string
        }

        //Dashboard Reducer
        interface SELECTED_SERVER_STATE_OBJECT {
            server_id: null | number
            server_name: string
            selected_channel_id: null | number
            selected_channel_name: string
            channels: CHANNELS
        }

        interface DASHBOARD_STATE {
            selected_server: SELECTED_SERVER_STATE_OBJECT,
            servers: Array<SERVER>
        }

        //Chat Reducer
        interface CHAT_STATE {
            selected_channel_messages: Array<CHANNEL_MESSAGES>
            selected_user_messages: Array<CHANNEL_MESSAGES>
        }

        //ChannelUsers Reducer
        interface CHANNEL_USERS_STATE {
            channel_users: Array<CHANNEL_USER>
        }

        //UserFriends Reducer
        interface USER_FRIENDS_STATE {
            friends: Array<CHANNEL_USER>
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [User Service]
     */
        interface USER {
            id: number
            user_name: string
            message: Text
        }

        interface CHAT_USER extends USER {
            authdata: string
        }

        interface GET_USER_MESSAGES_REQUEST {
            user_id: number | string
            friend_id: number | string
        }
        
        interface SAVE_SELECTED_CHANNEL_REQUEST {
            user_id: number
            selected_server_id: number
            channel_id: number
        }

        interface SAVE_SELECTED_USER_REQUEST {
            user_id: number
            friend_id: number
            friend_user_name: string
        }

        interface SAVE_SELECTED_SERVER_REQUEST {
            user_id: number
            server_id: number
            server_name: string
        }

        interface SAVE_MESSAGE_REQUEST {
            channel_id: number
            server_id: number
            user_id: number
            user_name: string
            message: string
        }
    /** ---------------------------------------------------------------------- */
    /**
     * [Channel Service]
     */

    /** ---------------------------------------------------------------------- */
}