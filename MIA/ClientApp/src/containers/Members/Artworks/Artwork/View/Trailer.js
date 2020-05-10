import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { Trans } from "@lingui/macro";

const Trailer = ({ url, coverUrl, active, ...props }) => {
  return url ? (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <TrailerView url={url} coverUrl={coverUrl} />
    </div>
  ) : (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <p>
        <Trans id="no_trailer_yet">No trailer uploaded yet</Trans>
      </p>
    </div>
  );
};

const TrailerView = ({ url, coverUrl, ...props }) => {
  return (
    <div className="trailer_area">
      <div className="trailer">
        <ReactPlayer
          controls
          url={url}
          className="react-player"
          width="100%"
          height="100%"
          light={coverUrl}
        />
      </div>
    </div>
  );
};

export default Trailer;
