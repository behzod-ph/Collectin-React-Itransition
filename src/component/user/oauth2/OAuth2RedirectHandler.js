import React from 'react';
import {useNavigate} from 'react-router'
import {ACCESS_TOKEN} from "../../../util/constants";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useLocation} from "react-router";

function OAuth2RedirectHandler() {

    const location = useLocation()
    const navigate = useNavigate()

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    useEffect(() => {
        const token = getUrlParameter('token');
        const error = getUrlParameter('error');
        if (token) {
            navigate("/")
            localStorage.setItem(ACCESS_TOKEN, token);
        } else {
            navigate('/login')
            toast.error(error, {autoClose: 1500})
        }
    }, [])

    return <div></div>
}

export default OAuth2RedirectHandler;