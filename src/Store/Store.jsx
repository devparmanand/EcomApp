import { configureStore } from  "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"

import RootReducers from "./Reducers/RootReducers";
import RootSaga from "./Sagas/Rootsaga";
// import { applyMiddleware } from "@reduxjs/toolkit";

const saga=createSagaMiddleware()

const Store=configureStore({
    reducer:RootReducers,
    middleware: ()=>[saga]
})

export default Store
saga.run(RootSaga)