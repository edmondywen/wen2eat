import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import Pantry from './components/Pantry.js'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import DietaryRestrictions from './components/DietaryRestrictions.js';

import {Login} from './components/TempLogin.js'
import LoginSuccess from "./components/LoginSuccess"
import LoginFail from "./components/LoginFail"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<Pantry />}/>
          <Route path="pantry" element={<Pantry />}/>
          <Route path="dr" element={<DietaryRestrictions/>}/>
        </Route>
        <Route path="login" element={<Login/>}/>
        <Route path="LoginSuccess" element={<LoginSuccess/>}/>
        <Route path="LoginFail" element={<LoginFail/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
