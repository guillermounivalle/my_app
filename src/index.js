import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


firebase.initializeApp({
  apiKey: "AIzaSyDq_TfmCFSZAjjdv8AV4yDTnmXPrO_FftI",
  authDomain: "myappwithreact.firebaseapp.com",
  databaseURL: "https://myappwithreact.firebaseio.com",
  projectId: "myappwithreact",
  storageBucket: "myappwithreact.appspot.com",
  messagingSenderId: "537728454428"
});

ReactDOM.render(
  <App />, 
  document.getElementById('root'));
registerServiceWorker();
