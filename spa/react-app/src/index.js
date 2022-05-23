import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Components/Main';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FetchPersons from "./Components/FetchPersons";
import PersonForm from "./Components/PersonForm";
import FetchPerson from "./Components/FetchPerson";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Main/>}/>
        <Route path="/persons" element={<FetchPersons/>}/>
        <Route path="/persons/:personId" element={<FetchPerson type={"get"}/>}/>
        <Route path="/persons/:personId/edit" element={<FetchPerson type={"put"}/>}/>
        <Route path="/persons/add" element={<FetchPerson type={"post"}/>}/>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
