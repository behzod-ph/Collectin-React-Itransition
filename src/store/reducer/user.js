import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';
import {ACCESS_TOKEN} from "../../util/constants";


const initialState = {user: {}, users: [], authorization: false}

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        onAuthSuccess: (state, {payload: {data: {access_token}}}) => {
            state.authorization = true
            localStorage.setItem(ACCESS_TOKEN, access_token)
        },
        onGetAllSuccess: (state, {payload: {data}}) => {
            state.users = data
        },
        onGetMeSuccess: (state, {payload: {data}}) => {
            state.user = data ? data : {}
            state.authorization = data !== undefined
            if (data === undefined)
                localStorage.removeItem(ACCESS_TOKEN)
        },
        onMakeActionSuccess: (state, {payload: {message}}) => {
            toast.success(message, {autoClose: 500})
        },
        doNothing: (state, action) => {
        },
        onFail: (state, {payload: {message, data}}) => {
            toast.error(message ? message : data.message, {autoClose: 1500})
        }
    }
})


export const login = (data) => apiCall({
    url: '/auth/login',
    method: 'POST',
    onSuccess: slice.actions.onAuthSuccess.type,
    onFail: slice.actions.onFail.type,
    data
});

export const register = (data) => apiCall({
    url: '/auth/register',
    method: 'POST',
    onSuccess: slice.actions.onAuthSuccess.type,
    onFail: slice.actions.onFail.type,
    data
});
export const getUsers = () => apiCall({
    url: '/user/list',
    method: 'GET',
    onSuccess: slice.actions.onGetAllSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
});
export const getMe = () => apiCall({
    url: '/user/me',
    method: 'GET',
    onSuccess: slice.actions.onGetMeSuccess.type,
    onFail: slice.actions.onGetMeSuccess.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
});

export const makeRequestAction = (data) => apiCall({
    url: '/user/status',
    method: 'POST',
    onSuccess: slice.actions.onMakeActionSuccess.type,
    onFail: slice.actions.onFail.type,
    data,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
});
export const changeRole = (data) => apiCall({
    url: '/user/role',
    method: 'POST',
    onSuccess: slice.actions.onMakeActionSuccess.type,
    onFail: slice.actions.onFail.type,
    data,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
});
export const changeLanguage = (user_id,lang) => apiCall({
    url: '/user/language/' + user_id+'?lang='+lang,
    method: 'GET',
    onSuccess: slice.actions.doNothing.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)}
});


export default slice.reducer