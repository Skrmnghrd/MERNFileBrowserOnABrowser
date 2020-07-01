import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//import NPM modules

import "bootstrap/dist/css/bootstrap.min.css";
//import bootstrap css 

import BrowserWindow from "./components/fileBrowserWindow.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <h4>Test header</h4>
        <Route path="/" component={BrowserWindow} />
        </div>
    </Router>
  );
}

export default App;
