import {createSlice} from "@reduxjs/toolkit";
import {apiCall} from "../action/api";
import {toast} from 'react-toastify';
import {ACCESS_TOKEN} from "../../util/constants";
import fileDownload from "js-file-download";


const initialState = {
    collections: [],
    tags: [],
    items: {},
    topics: [],
    image_url: '',
    fields: [],
    item: {},
    searchResult: [],
    searchData: {}
}

const slice = createSlice({
    name: 'collection',
    initialState,
    reducers: {
        onGetAllSuccess: (state, {payload: {data}}) => {
            state.collections = data ? data : []
        },
        onGetTags: (state, {payload: {data}}) => {
            state.tags = data ? data : []
        },
        onGetItem: (state, {payload: {data}}) => {
            state.items = data
        },
        onGetSingleItem: (state, {payload: {data}}) => {
            state.item = data ? data : {}
        },
        onGetTopics: (state, {payload: {data}}) => {
            console.log("topic",);
            state.topics = data ? data : []
        },
        onSuccess: (state, {payload: {message}}) => {
            toast.success(message, {autoClose: 500})
        },
        onSaveImg: (state, {payload: {data}}) => {
            state.image_url = data[0]
        },
        clearImg: (state, {payload}) => {
            state.image_url = ''
        },
        onGetCollectionFields: (state, {payload: {data}}) => {
            state.fields = data ? data : []
        },
        onDeleteSuccess: (state, {payload: {message}}) => {
            toast.success(message, {autoClose: 500})
        },
        onDownload: (state, {payload}) => {
            fileDownload(payload, 'collection.csv')
        },
        onSearch: (state, {payload: {data}}) => {
            console.log("onSearch: ", data);
            state.searchResult = data ? data : ''
        },
        onGetSearchResult: (state, {payload: {data}}) => {
            console.log('onGetSearchResult: ',data)
            state.searchData = data
            state.items = data
            state.item = data

        },
        doNothing: (state, action) => {
        },
        onFail: (state, {payload: {message, data}}) => {
            toast.error(message ? message : data.error, {autoClose: 1500})
        },
    }
})

export const {clearImg} = slice.actions


export const getLatest = () => apiCall({
    url: '/collection/latest',
    method: 'GET',
    onSuccess: slice.actions.onGetAllSuccess.type,
    onFail: slice.actions.onFail.type,
});

export const deleteCollection = (id) => apiCall({
    url: '/collection/delete/' + id,
    method: 'GET',
    onSuccess: slice.actions.onDeleteSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});

export const getAllCollectionForAdmin = () => apiCall({
    url: '/collection/all',
    method: 'GET',
    onSuccess: slice.actions.onGetAllSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});


export const getAllCollectionsByUserId = (userId) => apiCall({
    url: '/collection/user/' + userId,
    method: 'GET',
    onSuccess: slice.actions.onGetAllSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});

export const getTags = () => apiCall({
    url: '/tag',
    method: 'GET',
    onSuccess: slice.actions.onGetTags.type,
    onFail: slice.actions.onFail.type,
});

export const getItemsByCollectionId = (collection_id) => apiCall({
    url: '/item/collection/' + collection_id,
    method: 'GET',
    onSuccess: slice.actions.onGetItem.type,
    onFail: slice.actions.onFail.type,
});
export const getItemsByTag = (tag_id) => apiCall({
    url: '/item/tag/' + tag_id,
    method: 'GET',
    onSuccess: slice.actions.onGetItem.type,
    onFail: slice.actions.onFail.type,
});

export const deleteItem = (id) => apiCall({
    url: '/item/delete/' + id,
    method: 'GET',
    onSuccess: slice.actions.onSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});

export const getTopics = () => apiCall({
    url: '/topic',
    method: 'GET',
    onSuccess: slice.actions.onGetTopics.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});
export const addCollection = (data) => apiCall({
    url: '/collection',
    method: 'POST',
    onSuccess: slice.actions.onSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
    data
});
export const saveImg = (data) => apiCall({
    url: '/file',
    method: 'POST',
    onSuccess: slice.actions.onSaveImg.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
    data
});
export const saveItem = (data) => apiCall({
    url: '/item',
    method: 'POST',
    onSuccess: slice.actions.onSuccess.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
    data
});
export const getCollectionFields = (collection_id) => apiCall({
    url: '/field/list?id=' + collection_id,
    method: 'GET',
    onSuccess: slice.actions.onGetCollectionFields.type,
    onFail: slice.actions.onFail.type,
    // headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});
export const getItem = (user_id, item_id) => apiCall({
    url: '/item/' + user_id + '/' + item_id,
    method: 'GET',
    onSuccess: slice.actions.onGetSingleItem.type,
    onFail: slice.actions.onFail.type,
    // headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});

export const putLike = (user_id, item_id, isLiked) => apiCall({
    url: '/item/like/' + user_id + '/' + item_id + '?isLiked=' + isLiked,
    method: 'GET',
    onSuccess: slice.actions.doNothing.type,
    onFail: slice.actions.onFail.type,
    // headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});
export const saveComment = (data) => apiCall({
    url: '/comment',
    method: 'POST',
    onSuccess: slice.actions.doNothing.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
    data
});
export const download = (id, lang) => apiCall({
    url: '/collection/csv?collection_id=' + id + "&lang=" + lang,
    method: 'GET',
    onSuccess: slice.actions.onDownload.type,
    onFail: slice.actions.onFail.type,
    headers: {Authorization: localStorage.getItem(ACCESS_TOKEN)},
});
export const searchText = (text) => apiCall({
    url: '/search?text=' + text,
    method: 'GET',
    onSuccess: slice.actions.onSearch.type,
    onFail: slice.actions.onFail.type,
});
export const getResultOfSearch = (param) => apiCall({
    url: '/search/element?' + param,
    method: 'GET',
    onSuccess: slice.actions.onGetSearchResult.type,
    onFail: slice.actions.onFail.type,
});


export default slice.reducer