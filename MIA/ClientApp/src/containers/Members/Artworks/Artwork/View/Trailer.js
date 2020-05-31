import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { Trans } from "@lingui/macro";

export const Trailer = ({ url, coverUrl, active, ...props }) => {
  return url ? (
    <TrailerView url={url} coverUrl={encodeURI(coverUrl)} />
  ) : (
    <p className="info">
      <Trans id="no_trailer_yet">No trailer uploaded yet</Trans>
    </p>
  );
};

const TrailerTab = ({ url, coverUrl, active, ...props }) => {
  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <Trailer url={url} coverUrl={encodeURI(coverUrl)} />
    </div>
  );
};

const TrailerView = ({ url, coverUrl, ...props }) => {
  return (
    <div className="trailer_area">
      <div className="trailer">
        <ReactPlayer
          playing
          controls
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          light={encodeURI(coverUrl)}
        />
      </div>
    </div>
  );
};

export default TrailerTab;
