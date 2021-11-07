import { Dispatch } from "react";
import { StateFromReducersMapObject } from "redux";

declare global {
    declare module '*.scss'

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
        user: USER
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
}