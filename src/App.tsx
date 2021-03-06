import React, { useEffect, useState } from 'react';
import { Switch, Route, useRouteMatch, useParams, useHistory, useLocation, Redirect } from "react-router-dom"
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
import { authSlice, getUserInfo, setMessage } from './reducers/authSlice';
import { fireAuth } from './firebase';
import Loader from './components/app/Loader';

function useQuery(location: Location<LocationState>) {
  return new URLSearchParams(location.search);
}


function App() {
  const location = useLocation();
  const history = useHistory();
  const [tryToLogin, setTryToLogin] = useState<boolean>(false);
  const dispatch = useDispatch();
  const query = useQuery(location);
  const { userError, user, loading, message } = useTypedSelector((state) => state.auth)

  useEffect(() => {
    fireAuth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(getUserInfo())
      }
      setTryToLogin(true)
    })
  }, [])

  useEffect(() => {
    if (query.get("message")) {
      M.toast({ html: query.get("message") || undefined })
      query.delete("message")
      history.push("/login")
    }
    if (userError) {
      M.toast({ html: userError })
    }
    if (message) {
      M.toast({ html: message })
      dispatch(setMessage(null))
    }
    dispatch(authSlice.actions.error(null))
  }, [location, userError, message])

  if (loading || !tryToLogin) {
    return <Loader />
  }
  const renderPrivateRouters = () => {
    if (!user) {
      return null
    }
    return (
      <>
        <Route path={"/"} component={Home} exact={true} />
        <Route path={"/categories"} component={Categories} />
        <Route path={"/detail-record"} component={DetailRecord} />
        <Route path={"/history"} component={History} />
        <Route path={"/planning"} component={Planning} />
        <Route path={"/record"} component={Record} />
        <Route path={"/profile"} component={Profile} />
        <Redirect to={"/"} />
      </>
    )
  }
  const renderPublicRouters = () => {
    if (user) {
      return null
    }
    return (
      <>
        <Route path={"/login"} component={Login} />
        <Route path={"/register"} component={Register} />
        <Redirect to={"/login"} />
      </>
    )
  }
  return (
    <Switch>
      {renderPrivateRouters()}
      {renderPublicRouters()}
    </Switch>
  );
}

export default App;
