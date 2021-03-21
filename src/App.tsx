import React, { useEffect } from 'react';
import { Switch, Route, useRouteMatch, useParams, useHistory, useLocation } from "react-router-dom"
import { Location, LocationState } from "history"
import 'materialize-css/dist/js/materialize'
import 'materialize-css/dist/css/materialize.css';
import './App.css';

import Login from './pages/Login';
import Categories from './pages/Categories';
import Home from './pages/Home';
import DetailRecord from './pages/DetailRecord';
import History from './pages/History';
import Planning from './pages/Planning';
import Record from './pages/Record';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from './hooks/useTypedSelector';
import { authSlice } from './features/counter/authSlice';

function useQuery(location: Location<LocationState>) {
  return new URLSearchParams(location.search);
}


function App() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useQuery(location);
  const userError = useTypedSelector((state) => state.auth.userError)
  useEffect(()=>{
    // fireAuth.onAuthStateChanged((userAuth)=>{
    // })
    console.log(userError);

  },[])

  useEffect(() => {
    
    if (query.get("message")) {
      M.toast({ html: query.get("message") || undefined })
      query.delete("message")
      history.push("/login")
    }
    if(userError){
      M.toast({ html: userError })
    }
    dispatch(authSlice.actions.error(null))
  }, [location,userError])

  return (
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
  );
}

export default App;
