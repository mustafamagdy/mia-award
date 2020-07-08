import React, { useState } from "react";
import { Route, withRouter, Switch, Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";
import Award from "./Award";
import { Trans } from "@lingui/macro";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import classNames from "classnames";
import Artwork from "./ArtworkItem";

const MembersDashboard = ({
  fetchMyArtworks,
  fetchMyAwards,
  myAwards,
  myArtworks,
  myContestants,
  myAwardsLoaded,
  myArtworksLoaded,
  judgeCompleted,
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
      <div
        className="upload_poster"
        style={{
          background:
            "transparent url('/assets/images/poaster.png') scroll no-repeat top center/cover",
        }}
      ></div>
      <div className="awards_area">
        <div className="title">
          <Trans id="awards">Awards</Trans>
        </div>
        <div className="all_awards_area">
          {myAwards &&
            myAwards.map((m, i) => {
              return <Award key={i} award={m} />;
            })}
          {myAwards.length === 0 && (
            <p className="info">
              <Trans id="no_awards_yet">No awards yet</Trans>
            </p>
          )}
        </div>
      </div>
      <div className="show_area main_tabs">
        <ul>
          <TabList
            activeClassName="active"
            activeIndex={activeIndex}
            activeTabKey={activeTabKey}
            handleActiveTabWithKey={handleActiveTab}
          >
            {tabs.map((t, i) => (
              <Tab key={t} tabKey={t}>
                <li className="title">
                  <Trans id={t}>{t}</Trans>
                </li>
              </Tab>
            ))}
          </TabList>
        </ul>
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
            {!judgeCompleted && (
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
            )}
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
            {!judgeCompleted && (
              <div className="item add_new">
                <div className="upload_area">
                  <NavLink to="/members/contestant">
                    <i className="icofont-plus"></i>
                    <span>
                      <Trans id="add_new_contestant">
                        apply for contestant
                      </Trans>
                    </span>
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({
  home: { options },
  members: {
    myAwards,
    myArtworks,
    myContestants,
    myAwardsLoaded,
    myArtworksLoaded,
  },
}) => {
  let judgeCompleted = options.allJudgeFinished;
  return {
    myAwards,
    myArtworks,
    myContestants,
    myAwardsLoaded,
    myArtworksLoaded,
    judgeCompleted,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions, ...authActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MembersDashboard));
