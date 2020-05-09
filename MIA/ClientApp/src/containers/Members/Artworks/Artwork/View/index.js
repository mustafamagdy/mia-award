import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import "lightbox-react/style.css"; // This only needs to be imported once in your app
import { LanguageContext } from "containers/Providers/LanguageProvider";

import PaymentView from "./PaymentView";
import Files from "./Files";
import Trailer from "./Trailer";

const ViewArtwork = ({
  artwork,
  editArtwork,
  publishArtwork,
  history,
  match: {
    params: { id },
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
      {artwork && (
        <Info
          active={activeTabKey == "info"}
          editArtwork={editArtwork}
          publish={publishArtwork}
          history={history}
          details={artwork}
          id={id}
        />
      )}
      <PaymentView
        active={activeTabKey == "payment-view"}
        details={artwork?.payment}
      />
      <Trailer
        active={activeTabKey == "trailer"}
        url={artwork?.trailerUrl}
        coverUrl={artwork?.coverImageUrl}
      />
      <Files
        active={activeTabKey == "files"}
        title={artwork?.title}
        files={artwork?.files}
        posterUrl={artwork?.posterUrl}
      />
    </div>
  );
};

const Info = ({
  id,
  details: {
    projectName,
    description,
    siteUrl,
    productionYear,
    broadcastYear,
    tvChannels,
    onlineChannels,
    ProductionLicenseNumber,
    productionLicenseAgency,
    uploadComplete,
  },
  active,
  editArtwork,
  publish,
  history,
  ...props
}) => {
  return (
    <div className={classNames("tab_content tab_info", { active })}>
      <div class="info_show">
        <ul>
          <li>
            <span>
              <Trans id="project_name">Project Name</Trans> :
            </span>
            <LanguageContext.Consumer>
              {({ locale }) => <p>{projectName[locale.code]}</p>}
            </LanguageContext.Consumer>
          </li>
          <li>
            <span>
              <Trans id="description">Description</Trans> :
            </span>
            <LanguageContext.Consumer>
              {({ locale }) => <p>{description[locale.code]}</p>}
            </LanguageContext.Consumer>
          </li>
          <li>
            <span>
              <Trans id="siteUrl">Site URL</Trans> :
            </span>
            <p>{siteUrl}</p>
          </li>
          <li>
            <span>
              <Trans id="production_year">Production Year</Trans> :
            </span>
            <p>{productionYear}</p>
          </li>
          <li>
            <span>
              <Trans id="broadcast_year">Broadcast Year</Trans> :
            </span>
            <p>{broadcastYear}</p>
          </li>
          <li>
            <div class="crew_content">
              <div class="title">
                <Trans id="tv_channels">TV Channels</Trans> :
              </div>
              <div class="content">
                {tvChannels.split(",").map((a, i) => (
                  <>
                    {a} <br />
                  </>
                ))}
              </div>
              <div class="title">
                <Trans id="online_channels">Online Channels</Trans> :
              </div>
              <div class="content">
                {onlineChannels.split(",").map((a, i) => (
                  <>
                    {a} <br />
                  </>
                ))}
              </div>
            </div>
          </li>
          <li>
            <span>
              <Trans id="production_license_number">
                Production License Number
              </Trans>
              :
            </span>
            <p>{ProductionLicenseNumber}</p>}
          </li>
          <li>
            <span>
              <Trans id="production_license_agency">
                Production License Agency
              </Trans>
              :
            </span>
            <p>{productionLicenseAgency}</p>}
          </li>
        </ul>
      </div>

      <button
        disabled={uploadComplete}
        onClick={() => {
          editArtwork();
          history.push(`/members/artwork/${id}/edit`);
        }}
      >
        <Trans id="edit_info">Edit Info</Trans>
      </button>

      <button
        disabled={uploadComplete}
        onClick={() => {
          const data = { id: id, publish: true };
          publish({
            ...data,
            id: id,
          });
          history.push(`/members`);
        }}
      >
        <Trans id="send_for_judge">Send for judge</Trans>
      </button>
    </div>
  );
};

const mapStateToProps = ({ members: { artworkDetails, artworkMode } }) => ({
  artworkDetails,
  artworkMode,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewArtwork));
