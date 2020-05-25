import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import NewContestant from "./NewContestant";
import ViewContestant from "./View";
import Edit from "./Edit";

const Contestant = ({ awards, history, ...props }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/members/contestant" component={NewContestant} />
        <Route exact path="/members/contestant/:id" component={ViewContestant} />
        <Route exact path="/members/contestant/:id/edit" component={Edit} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards } }) => ({
  awards,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Contestant);
