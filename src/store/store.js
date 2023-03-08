import {configureStore} from "@reduxjs/toolkit";
import api from "./middleware/api";
import user from "./reducer/user";
import collection from "./reducer/collection";

export default configureStore({
    reducer: {user,collection},
    middleware: [api]
})