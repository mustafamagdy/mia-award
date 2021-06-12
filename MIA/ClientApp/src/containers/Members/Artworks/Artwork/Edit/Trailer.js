import React, { useEffect } from "react";
import classNames from "classnames";
import { useState } from "react";
import { Uploader, ProgressBar } from "components/Forms";
import { Trans } from "@lingui/macro";
import { Trailer as TrailerView } from "../View/Trailer";
import { withRouter } from "react-router";
import { Subject } from "rxjs";
import { I18n } from "@lingui/react";
import config from "config";
import UploadingProgress from "./UploadingProgress";
import UploadDropZone from "components/Forms/UploadDropZone";

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
  // file -> name (trailer, cover, poster)
  const [files, setFiles] = useState([]);

  const setTrailerFile = (acceptedFiles) => {
    if (acceptedFiles == undefined || acceptedFiles.length == 0) return;
    const _file = acceptedFiles[0];
    const key = "trailer";
    if (files.find((a) => a.key == key) == undefined) {
      setFiles([...files, { key: key, api: "updateTrailer", theFile: _file }]);
    }
  };
  const setCoverFile = (acceptedFiles) => {
    if (acceptedFiles == undefined || acceptedFiles.length == 0) return;
    const _file = acceptedFiles[0];
    const key = "cover";
    if (files.find((a) => a.key == key) == undefined) {
      setFiles([
        ...files,
        { key: key, api: "updateCoverImage", theFile: _file },
      ]);
    }
  };
  const setPosterFile = (acceptedFiles) => {
    if (acceptedFiles == undefined || acceptedFiles.length == 0) return;
    const _file = acceptedFiles[0];
    const key = "poster";
    if (files.find((a) => a.key == key) == undefined) {
      setFiles([
        ...files,
        { key: key, api: "updatePosterImage", theFile: _file },
      ]);
    }
  };

  return (
    <div className={classNames("tab_content tab_upload_trailers", { active })}>
      <div className="uploads_area">
        <div className="bottom_upload">
          <div className="upload_input">
            <form action="#">
              <UploadDropZone
                minSize={5} //minimum 5 mb for chunk uploader
                setFiles={setTrailerFile}
                className="upload_now"
                iconClass="icofont-upload-alt"
                message="Drag trailer video here"
                multiple={false}
                inputContent="Drop File"
                style={{ width: "100%", height: "100%" }}
                extensions={config.uploadVideoFileExtension}
                accept={config.validationRules.videoFiles}
              />
              <UploadDropZone
                setFiles={setCoverFile}
                className="upload_now"
                iconClass="icofont-upload-alt"
                message="Drag cover image here"
                multiple={false}
                inputContent="Drop File"
                extensions={config.uploadImageFileExtension}
                style={{ width: "100%", height: "100%" }}
                accept={config.validationRules.imageFiles}
              />
              <UploadDropZone
                setFiles={setPosterFile}
                className="upload_now"
                iconClass="icofont-upload-alt"
                message="Drag poster image here"
                multiple={false}
                inputContent="Drop File"
                extensions={config.uploadImageFileExtension}
                style={{ width: "100%", height: "100%" }}
                accept={config.validationRules.imageFiles}
              />
            </form>
          </div>

          <div className="upload_list">
            <div className="title">Files Upload</div>
            {files &&
              files.map((f) => {
                return (
                  <Uploader
                    key={f.key}
                    uploadChunkApi={window.api.members[f.api]}
                    dir={"Artwork"}
                    dirId={artworkId}
                    file={f.theFile}
                  >
                    <UploadingProgress file={f.theFile} />
                  </Uploader>
                );
              })}
          </div>
        </div>
      </div>

      {/* <div className="trailer_area">
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
      </div> */}
    </div>
  );
};

export default withRouter(Trailer);
