import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import ReactPlayer from "react-player";

import PaymentView from "./PaymentView";

const ViewArtwork = ({
  artworkDetails,
  editArtwork,
  publishArtwork,
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
      <Info active={activeTabKey == "info"} editArtwork={editArtwork} publish={publishArtwork} history={history} details={artworkDetails} />
      <PaymentView active={activeTabKey == "payment-view"} />
      <Trailer active={activeTabKey == "trailer"} url={artworkDetails?.trailerUrl} coverUrl={artworkDetails?.coverUrl} />
      <Files active={activeTabKey == "files"} files={artworkDetails?.files} posterUrl={artworkDetails?.posterUrl} />
    </div>
  );
};

const Info = ({ details, active, editArtwork, publish, history, ...props }) => {
  console.log(details)
  return <div className={classNames("tab_content tab_info", { active })}>
    <div class="info_show">
      <ul>
        <li><span>Director :</span><p>{details?.directors}</p></li>
        <li><span>Production :</span><p>{details?.producers}</p></li>
        <li><span>Writers :</span><p>{details?.writers.split(',').map(c => <> {c} <br /></>)}</p></li>
        <li><span>Story :</span><p>{details?.story}</p></li>
        <li><span>Stars :</span><p>{details?.stars.split(',').map(c => <> {c} <br /></>)}</p></li>
        <li>
          <span>Crew :</span>
          <div class="crew_content">
            <div class="title">Cast</div>
            <div class="content">{details?.crew.split(',').map(c => <> {c} <br /></>)}
            </div>
            <div class="title">D.O.P</div>
            <div class="content">
              {details?.Year}
            </div>
          </div>
        </li>
      </ul>
    </div>
    <button disabled={details?.uploadComplete}
      onClick={() => {
        editArtwork();
        history.push(`/members/artwork/${details.id}/edit`);
      }}
    >
      edit info
    </button>

    <button disabled={details?.uploadComplete}
      onClick={() => {
        const data = { id: details.id, publish: true };
        publish(
          {
            ...data,
            id: details.id
            });
        history.push(`/members`);
      }}
    >
      publish artwork for review
    </button>
  </div>
};
const Trailer = ({ url, coverUrl, active, ...props }) => {
  return (<div className={classNames("tab_content tab_trailer", { active })}>
    <TrailerView url={url} coverUrl={coverUrl} />
  </div>)
}


const Files = ({ files, posterUrl, active, ...props }) => {

  return <div className={classNames("tab_content tab_files", { active })}>
    <div class="item_show">
      <div class="season_content">
        <ol>
          {files &&
            files.map((file, i) => {
              return <File posterUrl={posterUrl} file={file}/>
            })}
        </ol>
      </div>
    </div>
  </div>
};

const File=({posterUrl,file,...props})=>{
  return (<>
    <ReactPlayer
      playing
      url={file.fileUrl}
      className="react-player"
      width="100%"
      height="100%"
      light={posterUrl}
    />
    <div className="zoom_image">
      <span>
        <i className="icofont-ui-zoom-in"></i>
      </span>
    </div>
  </>

  )
}
const TrailerView = ({ url, coverUrl, setuploadMode, ...props }) => {
  const [mediaType, setmediaType] = useState('image');

  const handleItemClicked = () => {
    setmediaType(mediaType == 'image' ? 'vedio' : 'vedio');
  }
  return <> 
      <ReactPlayer
        playing
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        light={coverUrl}
      />
      <div className="zoom_image">
        <span>
          <i className="icofont-ui-zoom-in"></i>
        </span>
      </div>
  </>
};
const mapStateToProps = ({ members: { artworkDetails, artworkMode } }) => ({ artworkDetails, artworkMode });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewArtwork));
