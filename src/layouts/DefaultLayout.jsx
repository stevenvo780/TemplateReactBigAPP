import React from "react";
import { Route, Switch } from "react-router-dom";

function DefaultLayout(props) {
  return (
    <Switch>
      {props.routes.map((prop, key) => (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        ))}
    </Switch>
  );
}

export default DefaultLayout;
X