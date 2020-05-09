import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";

const Trailer = ({ url, coverUrl, active, ...props }) => {
  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <TrailerView url={url} coverUrl={coverUrl} />
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
