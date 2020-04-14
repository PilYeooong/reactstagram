import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredRoute({
  component: Component,
  ...kwargs
}) {
  const {
    store: { isAuthenticated },
  } = useAppContext();

  return (
    <Route
      {...kwargs}
      render={(props) => { // Route에 의해 전달된 props를 사용 가능
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/accounts/login",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
