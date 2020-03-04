import React, { useState, useEffect } from "react";
import classNames from "classnames";
import UploadDropZone from 'components/Forms/UploadDropZone';
import { Uploader, ProgressBar } from "components/Forms";


const UploadingProgress = ({ progress, file, props }) => {
  return <>
    {progress &&
      progress.map(p => {
        let percent = p.percent / (p.size / 1024 / 1024) * 100;
        return <div className="item" key={p.key}>


          <div className="name" >
            <span>{p.key}</span>
            <p>{Math.trunc(p.size / 1024 / 1024)} Mb</p>
          </div>
          <div className="bar_area">
            <div className="progress_bar">
              <div className="progress_inside" style={{ width: `${percent}%` }}></div>
            </div>
            {/* <div className="play">
              <i className="icofont-ui-play"></i>
            </div>
            <div className="cancel">
              <i className="icofont-close"></i>
            </div> */}
          </div>
          <div className="progress_number">
            Uploading <p>{Math.trunc(percent)}%</p> done
      </div>
        </div>
      })}</>
};

const FileDetails = ({ progress, file, ...props }) => (

  <div className="item" >


    <div className="name" >
      <span>{file.name}</span>
      {/* <p>{Math.trunc(p.size/1024/1024)} Mb</p> */}
    </div>
    <div className="bar_area">
      <ProgressBar progress={progress} />
      {/* <div className="play">
              <i className="icofont-ui-play"></i>
            </div>
            <div className="cancel">
              <i className="icofont-close"></i>
            </div> */}
    </div>
    {/* <div className="progress_number">
            Uploading <p>{Math.trunc( percent )}%</p> done
      </div> */}
  </div>

  // <div>
  //   <label> {file.name}</label>
  //   <ProgressBar progress={progress} />
  // </div>
);

const Files = ({ active, artworkId }, props) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  return <div className={classNames("tab_content tab_upload_videos", { active })}>
    <div className="uploads_area">
      <div className="top_upload">
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </div>
      <div className="bottom_upload">
        <div className="upload_input">
          <form action="#">
            <UploadDropZone
              progress={progress}
              setFiles={setFiles}
              setProgress={setProgress}
              // accept="video/*"
              className="upload_now"
              iconClass="icofont-upload-alt"
              message='Drag files to upload'
              multiple={true}
              inputContent="Drop Files (Custom Preview)"
              style={{ width: '100%', height: '100%' }} />

            {files &&
              files.map(f => {
                return <Uploader
                  key={f.name}
                  uploadChunkApi={window.api.members.postFileChunk}
                  dir={"Artwork"}
                  dirId={artworkId}
                  onProgress={p => {
                    const indx = progress.findIndex(a => a.key == f.name);
                    if (indx != -1) progress[indx].percent = p;
                    else progress.push({ key: f.name, percent: p, size: f.size });
                    setProgress([...progress]);
                  }}
                  file={f}
                >
                  {/* <div className="upload_list">
          <div className="title">Files Upload</div>
                  <FileDetails file={f}/>
                  
        </div> */}
                </Uploader>
              }
              )}
            <span>Choose Files</span>
          </form>
        </div>

        <div className="upload_list">
          <div className="title">Files Upload</div>
          <UploadingProgress progress={progress} />

        </div>
      </div>
    </div>
  </div>
};

export default Files;
