import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import ReactDOM from "react-dom";
import React from "react";
import App from "./App";

let reRenderTree = (state) => {
    //наступний урок #38
    ReactDOM.render(
        <React.StrictMode>
            <App state={state} addReview={store.addReview.bind(store)}/>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

reRenderTree(store.getState());
store.subscribe(reRenderTree);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
