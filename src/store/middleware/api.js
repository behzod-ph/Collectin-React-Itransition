import axios from "axios";
import {apiCall} from "../action/api";
import {API_BASE_URL} from "../../util/constants";


const api = ({dispatch}) => (next) => (action) => {
    if (action.type !== apiCall.type) {
        next(action);
        return;
    }
    next(action)
    const {url, method, onSuccess, onFail, data, headers} = action.payload


    axios({
        baseURL: API_BASE_URL,
        url,
        method,
        data,
        headers
    }).then(res => {
        dispatch({
            type: onSuccess,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: onFail,
            payload: err.response
        })
    })
}

export default api;