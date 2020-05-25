import React, { useEffect } from "react";
import classNames from "classnames";
import { useState } from "react";
import { Uploader, ProgressBar } from "components/Forms";
import { Trans } from "@lingui/macro";
import { Trailer as TrailerView } from "../View/Trailer";

const Trailer = ({
  active,
  artworkId,
  trailerUrl,
  trailerPosterUrl,
  updateTrailer,
  coverUrl,
  ...props
}) => {
  const [trailerFile, setTrailerFile] = useState(undefined);
  const [coverFile, setCoverFile] = useState(undefined);
  const [posterFile, setPosterFile] = useState(undefined);
  const [trailerFileUploaded, setTrailerFileUploaded] = useState(false);
  const [coverFileUploaded, setCoverFileUploaded] = useState(false);
  const [posterFileUploaded, setPosterFileUploaded] = useState(false);
  const [progress, setProgress] = useState([]);
  const [uploadMode, setuploadMode] = useState(false);
  const handleUpdateTrailer = () => {
    setuploadMode(false);
  };

  useEffect(() => {
    console.log("all files uploaded");
  }, [trailerFileUploaded, coverFileUploaded, posterFileUploaded]);

  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {!uploadMode ? (
          <div style={{ width: "100%" }}>
            <TrailerView
              url={trailerUrl}
              coverUrl={coverUrl}
              setuploadMode={setuploadMode}
              uploadMode={uploadMode}
            />
            <button
              onClick={() => {
                setuploadMode(true);
              }}
            >
              <Trans id="change_trailer">Change trailer</Trans>
            </button>
          </div>
        ) : (
          <div>
            <div>
              <span>
                <Trans id="trailer">Trailer</Trans>
              </span>
              {trailerFile ? (
                <Uploader
                  key={trailerFile.name}
                  uploadChunkApi={window.api.members.updateTrailer}
                  dir={"Artwork"}
                  dirId={artworkId}
                  onProgress={(p) => {
                    const indx = progress.findIndex(
                      (a) => a.key == trailerFile.name
                    );
                    if (indx != -1) progress[indx].percent = p;
                    else progress.push({ key: trailerFile.name, percent: p });
                    setProgress([...progress]);
                  }}
                  onUploadComplete={() => {
                    setTrailerFileUploaded(true);
                  }}
                  file={trailerFile}
                >
                  <FileDetails file={trailerFile} />
                </Uploader>
              ) : (
                <input
                  type="file"
                  name="trailer"
                  accept="video/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setTrailerFile(e.target.files[0]);
                    }
                  }}
                />
              )}
            </div>
            <div>
              <span>
                <Trans id="cover">Cover</Trans>
              </span>
              {coverFile ? (
                <Uploader
                  key={coverFile.name}
                  uploadChunkApi={window.api.members.updateCoverImage}
                  dir={"Artwork"}
                  dirId={artworkId}
                  onProgress={(p) => {
                    const indx = progress.findIndex(
                      (a) => a.key == coverFile.name
                    );
                    if (indx != -1) progress[indx].percent = p;
                    else progress.push({ key: coverFile.name, percent: p });
                    setProgress([...progress]);
                  }}
                  onUploadComplete={() => {
                    setCoverFileUploaded(true);
                  }}
                  file={coverFile}
                >
                  <FileDetails file={coverFile} />
                </Uploader>
              ) : (
                <input
                  type="file"
                  name="coverFile"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setCoverFile(e.target.files[0]);
                    }
                  }}
                />
              )}
            </div>
            <div>
              <span>
                <Trans id="poster">Poster</Trans>
              </span>
              {posterFile ? (
                <Uploader
                  key={posterFile.name}
                  uploadChunkApi={window.api.members.updatePosterImage}
                  dir={"Artwork"}
                  dirId={artworkId}
                  onProgress={(p) => {
                    const indx = progress.findIndex(
                      (a) => a.key == posterFile.name
                    );
                    if (indx != -1) progress[indx].percent = p;
                    else progress.push({ key: posterFile.name, percent: p });
                    setProgress([...progress]);
                  }}
                  onUploadComplete={() => {
                    setPosterFileUploaded(true);
                  }}
                  file={posterFile}
                >
                  <FileDetails file={posterFile} />
                </Uploader>
              ) : (
                <input
                  type="file"
                  name="posterFile"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setPosterFile(e.target.files[0]);
                    }
                  }}
                />
              )}
            </div>

            {uploadMode && (
              <button onClick={handleUpdateTrailer}>Cancel update</button>
            )}
          </div>
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

export default Trailer;
