import {  createStore } from "redux";
import rootReducers from "./components/reducers";


const store = createStore(rootReducers)
export default store;