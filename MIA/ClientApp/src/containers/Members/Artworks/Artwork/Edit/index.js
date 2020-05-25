import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import Trailer from "./Trailer";
import Files from "./Files";
import EditArtworkInfo from "./EditArtwork";

const EditArtwork = ({
  artwork,
  switchToView,
  updateTrailer,
  history,
  saveArtworkInfo,
  match: {
    params: { id },
  },
  fetchArtworkWithDetails,
  ...props
}) => {
  const [tabs, setTabs] = useState(["info", "trailer"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");

  useEffect(() => {
    if (!!id) {
      fetchArtworkWithDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (artwork !== undefined) {
      const { canUploadFiles, uploadComplete } = artwork;

      //allow upoad files tab only if he can upload files, and files upload didn;t marked as complete
      if (tabs.indexOf("files") === -1 && canUploadFiles && !uploadComplete) {
        const t = [...tabs];
        t.push("files");
        setTabs(t);
      }

      setActiveTabKey("info");
    }
  }, [artwork, tabs]);

  const handleActiveTab = (tabKey) => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  return (
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
            <EditArtworkInfo editArtwork={saveArtworkInfo} artwork={artwork} />
          )}
          {activeTabKey === "trailer" && (
            <Trailer
              active={activeTabKey === "trailer"}
              artworkId={artwork && artwork.id}
              trailerUrl={artwork && artwork.trailerUrl}
              trailerPosterUrl={artwork && artwork.posterUrl}
              updateTrailer={updateTrailer}
              coverUrl={artwork?.coverImageUrl}
            />
          )}
          {artwork.canUploadFiles && activeTabKey === "files" && (
            <Files
              artworkId={artwork && artwork.id}
              files={artwork && artwork.files}
              active={activeTabKey === "files"}
            />
          )}
        </>
      )}
    </div>
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
