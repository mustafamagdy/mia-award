import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import NewArtwork from "./NewArtwork";
import ViewArtwork from "./View";
import Edit from "./Edit";

const Arwork = ({ awards, history, ...props }) => {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path="/members/artwork" render={props=> <NewArtwork {...props} awardType="artwork"/>} />
        <Route exact path="/members/artwork/:id" render={props=> <ViewArtwork {...props} awardType="artwork"/>} />
        <Route exact path="/members/artwork/:id/edit" render={props=> <Edit {...props} awardType="artwork"/>} />
        <Route exact path="/members/contestant" render={props=> <NewArtwork {...props} awardType="person"/>} />
        <Route exact path="/members/contestant/:id" render={props=> <ViewArtwork {...props} awardType="person"/>} />
        <Route exact path="/members/contestant/:id/edit" render={props=> <Edit {...props} awardType="person"/>} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards } }) => ({
  awards,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Arwork);
