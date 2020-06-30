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
  location: { search },
  removeArtworkFile,
  fetchArtworkWithDetails,
  ...props
}) => {
  const [tabs, setTabs] = useState(["info", "trailer"]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [artworkPosterStyle, setArtworkPosterStyle] = useState({
    background:
      "transparent url('/assets/images/poaster.png') scroll no-repeat top center/cover",
  });

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

      setArtworkPosterStyle({
        background: `transparent url('${
          artwork.posterUrl || "/assets/images/poaster.png"
        }') scroll no-repeat top center/cover`,
      });
    }

    const tabKey = new URLSearchParams(search).get("tabKey");
    if (tabKey != undefined && tabKey !== activeTabKey) {
      setActiveTabKey(tabKey);
      setActiveIndex(tabs.indexOf(tabKey));
    } else if (tabKey == undefined) {
      setActiveTabKey("info");
      setActiveIndex(0);
    } else if (tabKey == activeTabKey) {
      setActiveIndex(tabs.indexOf(tabKey));
    }
  }, [artwork, tabs, search]);

  const handleActiveTab = (tabKey) => {
    // setActiveTabKey(tabKey);
    // setActiveIndex(tabs.indexOf(tabKey));

    history.push({
      search: `?tabKey=${tabKey}`,
    });
  };

  return (
    <React.Fragment>
      <div className="upload_poster" style={artworkPosterStyle}>
        {artwork && artwork.coverUrl && (
          <div className="upload_area">
            <img
              src={artwork.coverUrl}
              style={{ objectFit: "cover" }}
              alt="Cover"
            />
          </div>
        )}
      </div>
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
          <React.Fragment>
            {activeTabKey === "info" && (
              <EditArtworkInfo
                editArtwork={saveArtworkInfo}
                artwork={artwork}
              />
            )}
            {activeTabKey === "trailer" && (
              <Trailer
                active={activeTabKey === "trailer"}
                artworkId={artwork && artwork.id}
                trailerUrl={artwork && artwork.trailerUrl}
                trailerPosterUrl={artwork && artwork.posterUrl}
                updateTrailer={updateTrailer}
                coverUrl={encodeURI(artwork?.coverUrl)}
              />
            )}
            {artwork.canUploadFiles && activeTabKey === "files" && (
              <Files
                artwork={artwork}
                active={activeTabKey === "files"}
                removeArtworkFile={removeArtworkFile}
              />
            )}
          </React.Fragment>
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
