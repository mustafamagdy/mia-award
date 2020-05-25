import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import EditContestantInfo from "./EditContestant";

const EditArtwork = ({
  artwork,
  switchToView,
  updateTrailer,
  history,
  saveArtworkInfo,
  match: {
    params: { id },
  },
  removeArtworkFile,
  fetchArtworkWithDetails,
  ...props
}) => {
  const [tabs, setTabs] = useState(["info"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");

  useEffect(() => {
    if (!!id) {
      fetchArtworkWithDetails(id);
    }
  }, [id]);

  useEffect(() => {}, [artwork, tabs]);

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
      <div className="stage_two">
        <div className="main_tabs">
          <ul>
            <TabList
              activeClassName="active"
              activeIndex={activeIndex}
              activeTabKey={activeTabKey}
              handleActiveTabWithKey={handleActiveTab}
            >
              {tabs.map((t, i) => (
                <Tab key={t} tabKey={t}>
                  <li>
                    <Trans id={t}>{t}</Trans>
                  </li>
                </Tab>
              ))}
            </TabList>
          </ul>
        </div>
        {artwork == undefined ? (
          <div>loading</div>
        ) : (
          <>
            {activeTabKey === "info" && (
              <EditContestantInfo
                editArtwork={saveArtworkInfo}
                artwork={artwork}
              />
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ members: { artwork } }) => ({
  artwork,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditArtwork));
