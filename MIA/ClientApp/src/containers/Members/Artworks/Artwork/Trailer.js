import React from "react";
import classNames from "classnames";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

const Trailer = ({ active, artworkId, trailerUrl, uploadTrailer, ...props }) => {
  const [startUploading, setStartUploading] = useState(false);
  const startUploadTrailer = async file => {
    console.log("uploading ", file);
    uploadTrailer({ id: artworkId, trailer: file });
  };

  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {artworkId && trailerUrl ? (
          <TrailerView url={trailerUrl} />
        ) : startUploading ? (
          <UploadingProgress />
        ) : (
          <div className="upload_trailer">
            <form>
              <input
                type="file"
                name="trailer"
                onChange={f => {
                  if (f.target.files.length > 0) {
                    setStartUploading(true);
                    startUploadTrailer(f.target.files[0]);
                  }
                }}
              />
              <i className="icofont-plus"></i>
              <span>Upload your trailer</span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const UploadingProgress = props => <div>loading ... </div>;
const TrailerView = ({ url, ...props }) => <div>trailer url {url} </div>;

export default Trailer;
