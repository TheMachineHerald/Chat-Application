import { HttpRequestHeader } from "antd/lib/upload/interface";
import { Dispatch, MouseEventHandler, ReactElement } from "react";
import { StateFromReducersMapObject } from "redux";
import { RequestInit } from "axios"
import { BackTopProps } from "antd";

declare global {
    declare module '*.scss'

    /**
     * REACT TYPES
     */

    /**
     * APPLICATION TYPES
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

    interface USER {
        id: number
        user_name: string
        message: Text
    }

    interface CHAT_USER extends USER {
        authdata: string
    }

    //define service types later
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
        selected_server_id: number
        selected_channel_id: number
    }

    interface CLIENT_SOCKET_OPEN_MESSAGE {
        event: string
        payload: CLIENT_USER_PAYLOAD
    }


    //<Socket Middlware>
    interface SAVE_SELECTED_CHANNEL_PAYLOAD {
        selected_channel_id: number | string
        selected_channel_name: string
        id: number
    }

    interface SAVE_SELECTED_CHANNEL_MESSAGE {
        event: string
        payload: SAVE_SELECTED_CHANNEL_PAYLOAD
    }
    //</Socket Middlware>

    interface UPDATE_SELECTED_SERVER_PAYLOAD {
        selected_server_id: number
        selected_channel_id: number
    }

    interface UPDATE_SELECTED_SERVER_MESSAGE {
        event: string
        payload: UPDATE_SELECTED_SERVER_PAYLOAD
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

    interface SOCKET_CLOSE_PLAYLOAD {
        event: string
        payload: Object<{}>
    }

    interface PONG_PAYLOAD {
        event: string
        payload: null
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

    interface CHANNEL_USER {
        id: number
        user_name: string
        first_name: string
        last_name: string
        email: string
        status: number
    }
    
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

    interface SELECTED_SERVER {
        server_id: number | null
        server_name: string
        selected_channel_id: number | null
        selected_channel_name: string
        channels: Object<CHANNELS>
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

    interface REGISTER_OBJECT {
        first_name: string
        last_name: string
        user_name: string
        email: string
        password: string
    }

    interface REGISTER_ROUTE_PAYLOAD {
        id: number
        first_name: string
        last_name: string
        user_name: string
        email: string
        passwrd: string
        status: number
        created_date: string
        selected_server_name: string
        create_date: string
    }

    interface REGISTERED_USER extends REGISTER_ROUTE_PAYLOAD{
        authdata: string
    }

    interface SAVE_SELECTED_CHANNEL_OBJECT {
        user_id: number
        selected_server_id: number
        channel_id: number
    }

    interface _SAVE_SELECTED_CHANNEL_PAYLOAD {
        channels: _CHANNELS
        payload: Object<{ messages: CHANNEL_MESSAGES }>
    }

    interface SAVE_SELECTED_SERVER_OBJECT {
        user_id: number
        server_id: number
        server_name: string
    }

    interface SAVE_MESSAGE_OBJECT {
        channel_id: number
        server_id: number
        user_id: number
        user_name: string
        message: string
    }

    /**
     * REDUX STATE TYPES
     */

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

    interface USER_STATE {
        id: null | number
        logged_in: boolean
        user_name: string
        first_name: string
        last_name: string
        email: string
        status: string | number
        selected_server_id: null | number
        selected_channel_id: null | number
        selected_server_name: string
        session_token: string
    }

    interface CHAT_STATE {
        selected_channel_messages: Array<CHANNEL_MESSAGES>
    }

    interface CHANNEL_USERS_STATE {
        channel_users: Array<CHANNEL_USER>
    }

    interface USER_COMPONENT_PROPS {
        user: CHANNEL_USER
    }

    interface MESSAGE_COMPONENT_PROPS {
        user: string
        date: string
        message: string
    }

    interface CHAT_HEADER_COMPONENT_PROPS {
        channel_name: string
    }

    interface LEFT_COMPONENT_PROPS {
        channel: string
    }

    interface PROFILE_COMPONENT_PROPS {
        user: USER_STATE
    }

    interface SIDE_PANEL_CHANNEL_PROPS {
        id: number
        user_id: number
        channel: string
        is_selected: number
        type: string
    }

    interface SETTINGS_MODAL_PROPS {
        visible: boolean
        onCancel: MouseEventHandler
    }

    interface SETTINGS_MODAL_RIGHT_COMPONENT_PROPS {
        toggle: MouseEventHandler
    }

    interface SERVER_COMPONENT_PROPS {
        id: number
        name: string
        user_id: number
    }
}