import React from "react";
import { Route, Switch, Redirect } from "react-router";

import Auth from "./Auth";
import MembersArea from "./MembersArea";

const Members = () => {
  return (
    <Switch>
      <Route
        path="/members/resetPassword"
        exact
        render={() => {
          return <Auth resetPasswordView={true} />;
        }}
      />
      <Route path="/members/signin" exact component={Auth} />
      <Route path="/" redirectTo="/members/signin" component={MembersArea} />
    </Switch>
  );
};

export default Members;
