import React, { useState, useEffect } from "react";
import classNames from "classnames";
import UploadDropZone from "components/Forms/UploadDropZone";
import { Uploader } from "components/Forms";
import config from "config";
import { File } from "../View/Files";
import UploadingProgress from "./UploadingProgress";

const Files = ({ active, artwork, removeArtworkFile }, props) => {
  const [files, setFiles] = useState([]);
  return (
    <div className={classNames("tab_content tab_upload_videos", { active })}>
      <div className="uploads_area">
        <div className="bottom_upload">
          <div className="upload_input">
            <form action="#">
              <UploadDropZone
                minSize={5} //minimum 5 mb for chunk uploader
                setFiles={setFiles}
                className="upload_now"
                iconClass="icofont-upload-alt"
                message="Drag files to upload"
                multiple={true}
                inputContent="Drop Files (Custom Preview)"
                style={{ width: "100%", height: "100%" }}
                extensions={config.uploadVideoFileExtension}
                accept={config.validationRules.videoFiles}
              />
              {/* <span>Choose Files</span> */}
            </form>
          </div>

          <div className="upload_list">
            <div className="title">Files Upload</div>
            {files &&
              files.map((f, index) => {
                return (
                  <Uploader
                    key={f.name}
                    uploadChunkApi={window.api.members.postFileChunk}
                    dir={"Artwork"}
                    dirId={artwork.id}
                    file={f}
                  >
                    <UploadingProgress file={f} />
                  </Uploader>
                );
              })}
          </div>
        </div>
      </div>
      <div className="item_show">
        <ul className="items">
          {artwork &&
            artwork.files.map((f, index) => (
              <File
                projectName={artwork.projectName}
                posterUrl={artwork.posterUrl}
                coverUrl={encodeURI(artwork.coverUrl)}
                file={f}
                key={index}
                showRemove
                removeArtworkFile={removeArtworkFile}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Files;
