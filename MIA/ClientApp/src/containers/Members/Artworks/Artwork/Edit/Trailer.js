import React, { useEffect } from "react";
import classNames from "classnames";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Uploader, ProgressBar } from "components/Forms";
import UploadDropZone from "components/Forms/UploadDropZone";

const Trailer = ({ active, artworkId, trailerUrl, trailerPosterUrl, updateTrailer, coverUrl, ...props }) => {
  const [files, setFiles] = useState([]);
  const [cover, setCover] = useState([]);
  const [progress, setProgress] = useState([]);
  const [uploadMode, setuploadMode] = useState(!artworkId && !trailerUrl);
  const handleUpdateTrailer = () => {
    setuploadMode(false);
  };
  useEffect(() => {
    setuploadMode(!artworkId && !trailerUrl);
  }, [artworkId, trailerUrl]);

  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {!uploadMode ? (
          <TrailerView url={trailerUrl} coverUrl={coverUrl} setuploadMode={setuploadMode} />
        ) : (
          <>
            <UploadDropZone
              setFiles={setFiles}
              accept="video/*"
              message="Upload your trailer"
              multiple={false}
              className="upload_trailer"
              iconClass="icofont-plus"
              style={{ width: "100%", height: "100%" }}
            />
            <br />
            <UploadDropZone
              className="upload_trailer"
              iconClass="icofont-plus"
              multiple={false}
              accept="image/*"
              setFiles={setFiles}
              message="Upload your Poster"
              style={{ width: "100%", height: "100%" }}
            />

            <UploadDropZone
              className="upload_trailer"
              iconClass="icofont-plus"
              multiple={false}
              accept="image/*"
              setFiles={setCover}
              message="Upload your cover image"
              style={{ width: "100%", height: "100%" }}
            />

            {files &&
              files.map(f => {
                return (
                  <Uploader
                    key={f.name}
                    uploadChunkApi={window.api.members.updateTrailer}
                    dir={"Artwork"}
                    dirId={artworkId}
                    onProgress={p => {
                      const indx = progress.findIndex(a => a.key == f.name);
                      if (indx != -1) progress[indx].percent = p;
                      else progress.push({ key: f.name, percent: p });
                      setProgress([...progress]);
                    }}
                    file={f}
                  >
                    <FileDetails file={f} />
                  </Uploader>
                );
              })}

            {cover &&
              cover.map(f => {
                return (
                  <Uploader
                    key={f.name}
                    uploadChunkApi={window.api.members.updateCoverImage}
                    dir={"Artwork"}
                    dirId={artworkId}
                    onProgress={p => {
                      const indx = progress.findIndex(a => a.key == f.name);
                      if (indx != -1) progress[indx].percent = p;
                      else progress.push({ key: f.name, percent: p });
                      setProgress([...progress]);
                    }}
                    file={f}
                  >
                    <FileDetails file={f} />
                  </Uploader>
                );
              })}
            {trailerUrl && uploadMode && <button onClick={handleUpdateTrailer}>Cancel update</button>}
          </>
        )}
      </div>
    </div>
  );
};

const FileDetails = ({ progress, file, ...props }) => (
  <div>
    <label> {file.name}</label>
    <ProgressBar progress={progress} />
  </div>
);

const TrailerView = ({ url, coverUrl, setuploadMode, ...props }) => {
  const handleUpdateTrailer = () => {
    setuploadMode(true);
  };
  return (
    <>
      <ReactPlayer controls url={url} className="react-player" width="100%" height="100%" light={coverUrl} />
      <div className="zoom_image">
        <span>
          <i className="icofont-ui-zoom-in"></i>
        </span>
      </div>
      <button onClick={() => handleUpdateTrailer()}>Update Trailer</button>
    </>
  );
};

//todo: complete it with switching to progress bar
const UploadZoneWithProgress = props => {
  const [files, setFiles] = useState([]);

  return (
    <UploadDropZone
      setFiles={setFiles}
      accept="video/*"
      message="Upload your trailer"
      multiple={false}
      className="upload_trailer"
      iconClass="icofont-plus"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Trailer;
