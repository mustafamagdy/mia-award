import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import AddArtwork from "./AddNew";
import ViewArtwork from "./View";
import EditArtwork from "./Edit";

const Arwork = ({ artworkDetails, addNewArtwork, awards, artworkMode, ...props }) => {
  return (
    <React.Fragment>
      <div className="upload_poster">
        <div className="upload_area">
          {artworkMode == "edit" ? (
            <form action="#">
              <input type="file" />
              <i className="icofont-plus"></i>
              <span>Upload show poster</span>
            </form>
          ) : (
            <img src={artworkDetails && artworkDetails.posterUrl} width={190} height={250} style={{ objectFit: "cover" }} />
          )}
        </div>
      </div>
      <Switch>
        <Route exact path="/members/artwork" component={AddArtwork} />
        <Route exact path="/members/artwork/:id" component={ViewArtwork} />
        <Route exact path="/members/artwork/:id/edit" component={EditArtwork} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards }, members: { artworkDetails, artworkMode } }) => ({ awards, artworkDetails, artworkMode });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Arwork);
