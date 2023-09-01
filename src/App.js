import './App.css';

import React, { useState } from "react";
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';


function App() {
  const [alert, setalert] = useState(null);

  const showalert = (message, type) => {
    setalert({

      message: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 2000);
  };

  return (
    <>
    <NoteState>
    <Router>
     <Navbar />
     <Alert alert = {alert}/>
     <div className="container">
      <Switch>
      <Route exact path="/">
            <Home showalert={showalert}/>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/login">
            <Login showalert={showalert}/>
          </Route>
          <Route exact path="/signup">
            <Singup showalert={showalert} />
          </Route>
        </Switch> 
        </div>
    </Router>
    </NoteState>
    </>
  );   
}

export default App;
