import React from "react";
import { ProgressBar } from "components/Forms";

const UploadingProgress = ({ progress, file, props }) => {
  return (
    <div className="item">
      <div className="name">
        <span>{file.name}</span>
        <p>{Math.trunc(file.size / 1024 / 1024)} Mb</p>
      </div>
      <div className="bar_area">
        <ProgressBar progress={progress} />
      </div>
      <div className="progress_number">
        Uploading <p>{Math.trunc(progress)}%</p> done
      </div>
    </div>
  );
};
export default UploadingProgress;
