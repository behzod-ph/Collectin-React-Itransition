import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store/store";

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ToastContainer/>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    rootElement
);

reportWebVitals();


