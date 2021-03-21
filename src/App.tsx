import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import 'materialize-css/dist/js/materialize'
import 'materialize-css/dist/css/materialize.css';

import Login from './pages/Login';
import Categories from './pages/Categories';
import Home from './pages/Home';
import DetailRecord from './pages/DetailRecord';
import History from './pages/History';
import Planning from './pages/Planning';
import Record from './pages/Record';
import Profile from './pages/Profile';
import Register from './pages/Register';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/"} component={Home} exact={true} />
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Route path={"/categories"} component={Categories} />
        <Route path={"/detail-record"} component={DetailRecord} />
        <Route path={"/history"} component={History} />
        <Route path={"/planning"} component={Planning} />
        <Route path={"/record"} component={Record} />
        <Route path={"/profile"} component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
