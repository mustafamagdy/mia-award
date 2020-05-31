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
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { I18n } from "@lingui/react";

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
  const [artworkPosterStyle, setArtworkPosterStyle] = useState({
    background:
      "transparent url('/assets/images/poaster.png') scroll no-repeat top center/cover",
  });

  useEffect(() => {
    if (artwork && artwork.posterUrl) {
      setArtworkPosterStyle({
        background: `transparent url('${artwork.posterUrl}') scroll no-repeat top center/cover`,
      });
    }
  }, [artwork]);

  const handleActiveTab = (tabKey) => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };
  return (
    <React.Fragment>
      <div className="upload_poster" style={artworkPosterStyle}>
        {artwork && artwork.coverImageUrl && (
          <div className="upload_area">
            <img
              src={artwork.coverImageUrl}
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
        {artwork ? (
          <>
            <Info
              active={activeTabKey == "info"}
              editArtwork={editArtwork}
              publish={publishArtwork}
              history={history}
              details={artwork}
              id={id}
              key="info"
            />
            <PaymentView
              active={activeTabKey == "payment-view"}
              details={artwork?.payment}
              key="payment-view"
            />
            {artwork.awardType == "artwork" ? (
              <>
                <Trailer
                  active={activeTabKey == "trailer"}
                  url={artwork?.trailerUrl}
                  coverUrl={encodeURI(artwork?.coverImageUrl)}
                  key="trailer"
                />
                <Files
                  active={activeTabKey == "files"}
                  projectName={artwork?.projectName}
                  files={artwork?.files}
                  posterUrl={artwork?.posterUrl}
                  coverUrl={encodeURI(artwork?.coverImageUrl)}
                  key="files"
                />
              </>
            ) : null}
          </>
        ) : (
          <div> Loading ...</div>
        )}
      </div>
    </React.Fragment>
  );
};

const Info = ({
  id,
  details: {
    awardType,
    projectName,
    description,
    siteUrl,
    productionYear,
    broadcastYear,
    tvChannels,
    onlineChannels,
    productionLicenseNumber,
    productionLicenseAgency,
    uploadComplete,
    canUploadFiles,
  },
  active,
  editArtwork,
  publish,
  history,
  ...props
}) => {
  return (
    <div className={classNames("tab_content tab_info", { active })}>
      <div className="info_show">
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
            <div className="crew_content">
              <div className="title">
                <Trans id="tv_channels">TV Channels</Trans> :
              </div>
              <div className="content">
                {tvChannels.split(",").map((a, i) => (
                  <React.Fragment key={i}>
                    {a} <br />
                  </React.Fragment>
                ))}
              </div>
              <div className="title">
                <Trans id="online_channels">Online Channels</Trans> :
              </div>
              <div className="content">
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
            <p>{productionLicenseNumber}</p>
          </li>
          <li>
            <span>
              <Trans id="production_license_agency">
                Production License Agency
              </Trans>
              :
            </span>
            <p>{productionLicenseAgency}</p>
          </li>
        </ul>
      </div>

      <button
        className="normal_button"
        disabled={uploadComplete}
        onClick={() => {
          editArtwork();
          history.push(`/members/artwork/${id}/edit`);
        }}
      >
        <Trans id="edit_info">Edit Info</Trans>
      </button>

      {canUploadFiles && (
        <I18n>
          {({ i18n }) => (
            <button
              className="normal_button"
              onClick={async () => {
                confirmAlert({
                  title: i18n._("confirm_send_to_judge"),
                  message: i18n._("are_you_sure_to_send_to_judge"),
                  buttons: [
                    {
                      label: i18n._("send"),
                      onClick: () => {
                        const data = { id: id, publish: true };
                        publish({
                          ...data,
                          id: id,
                        });
                        history.push(`/members`);
                      },
                    },
                    {
                      label: i18n._("no_wait"),
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              <Trans id="send_for_judge">Send for judge</Trans>
            </button>
          )}
        </I18n>
      )}
    </div>
  );
};

const mapStateToProps = ({ members: { artwork, artworkMode } }) => ({
  artwork,
  artworkMode,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ViewArtwork));
