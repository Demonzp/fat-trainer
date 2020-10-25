import React from "react";
import {Route, Redirect} from "react-router-dom";

import {useAppState} from "state/appState";
import Spinner from "components/Spinner";
import RoutNames from "../constants/routNames";

const GuestRoute = ({component:Component, ...rest})=> {
  const [{ authAttempted, user }] = useAppState();
   
  return (
    <Route
      {...rest}
      children={({ location }) => (
        authAttempted
        ?
        (
          !user
          ?
          <Component/>
          :
          <Redirect
            to={{
              pathname: RoutNames.dashboard,
              state: { from: location }
            }}
          />
        )
        :
        <Spinner gorizont="center"/>
      )}
    />
  );
}

export default GuestRoute;