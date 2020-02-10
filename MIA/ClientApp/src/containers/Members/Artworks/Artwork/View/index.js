import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import PaymentView from "./PaymentView";

const ViewArtwork = ({
  artworkDetails,
  editArtwork,
  history,
  match: {
    params: { id }
  },
  fetchArtworkWithDetails,
  ...props
}) => {
  useEffect(() => {
    if (!!id) {
      fetchArtworkWithDetails(id);
    }
  }, [id]);

  const tabs = ["info", "payment-view", "trailer", "files"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");

  const handleActiveTab = tabKey => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  return (
    <div className="stage_two">
      <div className="main_tabs">
        <ul>
          <TabList activeClassName="active" activeIndex={activeIndex} activeTabKey={activeTabKey} handleActiveTabWithKey={handleActiveTab}>
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
      <Info active={activeTabKey == "info"} editArtwork={editArtwork} history={history} details={artworkDetails} />
      <PaymentView active={activeTabKey == "payment-view"} />
      <Trailer active={activeTabKey == "trailer"} />
      <Files active={activeTabKey == "files"} />
    </div>
  );
};

const Info = ({ details, active, editArtwork, history, ...props }) => (
  <div className={classNames("tab_content tab_info", { active })}>
    info
    <br />
    <br />
    <br />
    <button
      onClick={() => {
        editArtwork();
        history.push(`/members/artwork/${details.id}/edit`);
      }}
    >
      edit info
    </button>
  </div>
);
const Trailer = ({ trailerUrl, active, ...props }) => <div className={classNames("tab_content tab_trailer", { active })}>trailer</div>;
const Files = ({ files, active, ...props }) => <div className={classNames("tab_content tab_files", { active })}>files</div>;

const mapStateToProps = ({ members: { artworkDetails, artworkMode } }) => ({ artworkDetails, artworkMode });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewArtwork));
