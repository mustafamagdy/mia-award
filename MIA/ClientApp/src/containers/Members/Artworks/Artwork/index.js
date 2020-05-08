import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import ArtworkData from "./ArtworkData";
import NewArtwork from "./NewArtwork";

const Arwork = ({
  artworkDetails,
  addNewArtwork,
  awards,
  artworkMode,
  history,
  ...props
}) => {
  useEffect(() => {
    if (artworkMode === "view") {
      history.push(`/members/artwork/${artworkDetails.id}`);
    }
  }, [artworkMode]);
  return (
    <React.Fragment>
      <div className="upload_poster">
        <div className="upload_area">
          {artworkMode === "edit" ? (
            <form action="#">
              <input type="file" />
              <i className="icofont-plus"></i>
              <span>Upload show poster</span>
            </form>
          ) : (
            <img
              src={artworkDetails && artworkDetails.coverImageUrl}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </div>
      <Switch>
        <Route exact path="/members/artwork" component={NewArtwork} />
        <Route exact path="/members/artwork/:id" component={ArtworkData} />
        <Route exact path="/members/artwork/:id?mode=edit" component={ArtworkData} />
      </Switch>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  home: { awards },
  members: { artworkDetails, artworkMode },
}) => ({ awards, artworkDetails, artworkMode });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Arwork);
