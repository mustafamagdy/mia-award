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
      <PaymentView active={activeTabKey == "payment-view"} details={artworkDetails?.payment} />
      <Trailer active={activeTabKey == "trailer"} url={artworkDetails?.trailerUrl} coverUrl={artworkDetails?.coverImageUrl} />
      <Files active={activeTabKey == "files"} files={artworkDetails?.files} posterUrl={artworkDetails?.posterUrl} />
    </div>
  );
};

const Info = ({ details, active, editArtwork, publish, history, ...props }) => {
  return <div className={classNames("tab_content tab_info", { active })}>
    <div className="info_show">
      <ul>
        <li><span>Director :</span><p>{details?.directors}</p></li>
        <li><span>Production :</span><p>{details?.producers}</p></li>
        <li><span>Writers :</span><p>{details?.writers.split(',').map((c,i) => <span key={i}> {c} <br /></span>)}</p></li>
        <li><span>Story :</span><p>{details?.story}</p></li>
        <li><span>Stars :</span><p>{details?.stars.split(',').map((c,i) => <span key={i}> {c} <br /></span>)}</p></li>
        <li>
          <span>Crew :</span>
          <div className="crew_content">
            <div className="title">Cast</div>
            <div className="content">{details?.crew.split(',').map((c,i) => <span key={i}> {c} <br /></span>)}
            </div>
            <div className="title">D.O.P</div>
            <div className="content">
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
    <div className="item_show">
      <div className="season_content">
        <ol>
          {files &&
            files.map((file, i) => {
              return <File posterUrl={posterUrl} file={file} key={i}/>
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
