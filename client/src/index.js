import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';
import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost/3001"
  
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
       <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


