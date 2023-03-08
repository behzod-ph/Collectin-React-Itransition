import * as React from 'react';
import Login from "./component/user/login";
import {Route, Routes} from "react-router";
import Register from "./component/user/register";
import Main from "./pages/blog/Main";
import OAuth2RedirectHandler from "./component/user/oauth2/OAuth2RedirectHandler";
import Dashboard from "./pages/dashboard/Dashboard";
import ItemsByTag from "./component/item/ItemsByTag";
import ItemsByCollection from "./component/item/ItemsByCollection";
import ItemPage from "./component/item/Item";


function App() {


    return (
        <Routes>
            <Route element={<OAuth2RedirectHandler/>} path="/oauth2/redirect"/>
            <Route element={<Dashboard/>} path={"/dashboard"}/>
            <Route element={<Login/>} path={"/login"}/>
            <Route element={<Register/>} path={"/register"}/>
            <Route element={<Main content={<ItemsByCollection/>}/>} path={"/itemsByCollection"}/>
            <Route element={<Main content={<ItemsByTag/>}/>} path={"/itemsByTag"}/>
            <Route element={<Main content={<ItemPage/>}/>} path={"/item"}/>
            <Route element={<Main/>} path={"/"}/>
        </Routes>
    )
}

export default App