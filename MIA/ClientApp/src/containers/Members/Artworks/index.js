import React, { useState } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";
import Artwork from "./ArtworkItem";
import Award from "./Award";
import { Trans } from "@lingui/macro";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import classNames from "classnames";

const Artworks = ({
  fetchMyArtworks,
  fetchMyAwards,
  myAwards,
  myArtworks,
  myContestants,
  myAwardsLoaded,
  myArtworksLoaded,
  ...props
}) => {
  if (!myAwardsLoaded) fetchMyAwards();
  if (!myArtworksLoaded) fetchMyArtworks();
  const tabs = ["shows", "contestant"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState(tabs[0]);

  const handleActiveTab = (tabKey) => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  return (
    <React.Fragment>
      <div className="upload_poster"></div>
      <div className="awards_area">
        <div className="title">Awards</div>
        <div className="all_awards_area">
          {myAwards &&
            myAwards.map((m, i) => {
              return <Award key={i} award={m} />;
            })}
          {myAwards.length === 0 && <div>No awards yet</div>}
        </div>
      </div>
      <div className="show_area">
        <TabList
          activeClassName="active"
          activeIndex={activeIndex}
          activeTabKey={activeTabKey}
          handleActiveTabWithKey={handleActiveTab}
        >
          {tabs.map((t, i) => (
            <Tab key={t} tabKey={t}>
              <div className="title">
                <Trans id={t}>{t}</Trans>
              </div>
            </Tab>
          ))}
        </TabList>
        {activeTabKey == "shows" && (
          <div
            className={classNames("all_shows_area", {
              active: activeTabKey == "shows",
            })}
          >
            {myArtworks &&
              myArtworks.map((m, i) => {
                return <Artwork artWork={m} key={i} />;
              })}
            <div className="item add_new">
              <div className="upload_area">
                <NavLink to="/members/artwork">
                  <i className="icofont-plus"></i>
                  <span>
                    <Trans id="add_new_show">add new show</Trans>
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        {activeTabKey == "contestant" && (
          <div
            className={classNames("all_shows_area", {
              active: activeTabKey == "contestants",
            })}
          >
            {myContestants &&
              myContestants.map((m, i) => {
                return <Artwork artWork={m} key={i} />;
              })}
            <div className="item add_new">
              <div className="upload_area">
                <NavLink to="/members/contestant">
                  <i className="icofont-plus"></i>
                  <span>
                    <Trans id="add_new_contestant">apply for contestant</Trans>
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  members: { myAwards, myArtworks, myAwardsLoaded, myArtworksLoaded },
}) => ({ myAwards, myArtworks, myAwardsLoaded, myArtworksLoaded });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions, ...authActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Artworks));
