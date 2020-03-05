import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import Info from "./Info";
import Trailer from "./Trailer";
import Files from "./Files";

const EditArtwork = ({
  artworkDetails,
  switchToView,
  updateTrailer,
  history,
  saveArtworkInfo,
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


  useEffect(() => {

    if (artworkDetails != undefined) {

      const { canUploadFiles } = artworkDetails;

      if (tabs.indexOf("files") === -1 && canUploadFiles) {
        const t = [...tabs];
        t.push("files");
        setTabs(t);
      }
    }
  }, [artworkDetails]);

  const [tabs, setTabs] = useState(["info", "trailer"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");

  const handleActiveTab = tabKey => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };
if(artworkDetails &&artworkDetails.uploadComplete){
  console.log(artworkDetails.uploadComplete)
  history.push('/members')
}
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
      <Info active={activeTabKey == "info"} saveArtworkInfo={saveArtworkInfo} details={artworkDetails} />
      <Trailer
        active={activeTabKey == "trailer"}
        artworkId={artworkDetails && artworkDetails.id}
        trailerUrl={artworkDetails && artworkDetails.trailerUrl}
        trailerPosterUrl={artworkDetails && artworkDetails.trailerPosterUrl}
        updateTrailer={updateTrailer}
      />
      {artworkDetails && artworkDetails.canUploadFiles && (
        <Files active={activeTabKey == "files"}
          artworkId={artworkDetails && artworkDetails.id}
          files={artworkDetails && artworkDetails.files} />
      )}
    </div>
  );
};

const mapStateToProps = ({ members: { artworkDetails, artworkMode } }) => ({ artworkDetails, artworkMode });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditArtwork));
