import React, { useEffect } from "react";
import classNames from "classnames";
import { useState } from "react";
import { Uploader, ProgressBar } from "components/Forms";
import { Trans } from "@lingui/macro";
import { Trailer as TrailerView } from "../View/Trailer";
import { withRouter } from "react-router";
import { Subject } from "rxjs";
import { I18n } from "@lingui/react";
import config from "../../../../../config";
const Trailer = ({
  active,
  artworkId,
  trailerUrl,
  trailerPosterUrl,
  updateTrailer,
  coverUrl,
  location,
  history,
  ...props
}) => {
  const [trailerFile, setTrailerFile] = useState(undefined);
  const [coverFile, setCoverFile] = useState(undefined);
  const [posterFile, setPosterFile] = useState(undefined);
  const [progress, setProgress] = useState([]);
  const [uploadMode, setuploadMode] = useState(false);

  const [uploading, setUploading] = useState(false);
  const uploads$ = new Subject();
  let uploadCounter = 0;
  const sub = uploads$.asObservable().subscribe((v) => {
    uploadCounter += v;
    if (uploadCounter > 0) {
      setUploading(true);
    } else {
      setUploading(false);
    }
  });

  const switchToUploadMode = () => {
    if (sub) {
      sub.unsubscribe();
    }
    setuploadMode(false);
    window.location.reload(false);
  };

  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {!uploadMode ? (
          <div style={{ width: "100%" }}>
            <TrailerView
              url={trailerUrl}
              coverUrl={
                coverUrl == "" ? "/assets/images/poaster.png" : encodeURI(coverUrl)
              }
              setuploadMode={setuploadMode}
              uploadMode={uploadMode}
            />
            <button
              style={{ alignSelf: "flex-start" }}
              className="normal_button"
              onClick={() => {
                setuploadMode(true);
              }}
            >
              <Trans id="change_trailer">Change trailer</Trans>
            </button>
          </div>
        ) : (
          <>
            <div className="trailer_section">
              <div className="item">
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
                      uploads$.next(-1);
                    }}
                    file={trailerFile}
                  >
                    <FileDetails file={trailerFile} />
                  </Uploader>
                ) : (
                  <div className="upload_trailer">
                    <i className="icofont-plus"></i>
                    <span>
                      <Trans id="trailer">Trailer</Trans>
                    </span>
                    <input
                      type="file"
                      name="trailer"
                      accept={config.validationRules.videoFiles}
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setTrailerFile(e.target.files[0]);
                          uploads$.next(1);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="item">
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
                      uploads$.next(-1);
                    }}
                    file={coverFile}
                  >
                    <FileDetails file={coverFile} />
                  </Uploader>
                ) : (
                  <div className="upload_trailer">
                    <i className="icofont-plus"></i>
                    <span>
                      <Trans id="cover">Cover</Trans>
                    </span>
                    <input
                      type="file"
                      name="coverFile"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setCoverFile(e.target.files[0]);
                          uploads$.next(1);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="item">
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
                      uploads$.next(-1);
                    }}
                    file={posterFile}
                  >
                    <FileDetails file={posterFile} />
                  </Uploader>
                ) : (
                  <div className="upload_trailer">
                    <i className="icofont-plus"></i>
                    <span>
                      <Trans id="poster">Poster</Trans>
                    </span>
                    <input
                      type="file"
                      name="posterFile"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setPosterFile(e.target.files[0]);
                          uploads$.next(1);
                        }
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            {uploadMode && (
              <button
                style={{ alignSelf: "flex-start" }}
                onClick={switchToUploadMode}
                disabled={uploading}
                className="normal_button"
              >
                <Trans id="finish_and_reload">Finish & Reload</Trans>
              </button>
            )}
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

export default withRouter(Trailer);
