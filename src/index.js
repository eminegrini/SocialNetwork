import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app'
import 'firebase/database'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import configureStore from './store'


const firebaseConfig = {
  apiKey: "AIzaSyCb1n-erO0FK1GBzCXFTLFevibgXG5e0tI",
  authDomain: "socialdoor-f87a6.firebaseapp.com",
  databaseURL: "https://socialdoor-f87a6.firebaseio.com",
  projectId: "socialdoor-f87a6",
  storageBucket: "socialdoor-f87a6.appspot.com",
  messagingSenderId: "376864063893",
  appId: "1:376864063893:web:393a04fff1122d4961769c",
  measurementId: "G-5FREQTZZXM"
};


firebase.initializeApp(firebaseConfig);

// export const db = firebase.database();

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
