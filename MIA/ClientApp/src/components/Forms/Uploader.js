import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Uploader = ({
  uploadChunkApi,
  sliceSizeInMb = 5,
  dir,
  dirId,
  onUploadComplete,
  onFailed,
  onPause,
  onResume,
  onProgress,
  file,
  children,
  ...props
}) => {
  const [progress, setProgress] = useState(0);
  const sliceSize = sliceSizeInMb * 1024 * 1024; // Send 5MB Chunks
  let size = 0;

  useEffect(() => {
    if (file && file.size > 0) {
      if (file.size >= sliceSize) {
        processFile(file);
      } else {
        uploadFileAsSingleChunk(file);
      }
    }
  }, [file]);

  const uploadFileAsSingleChunk = (file) => {
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(",")[1];
      onProgress && onProgress(50);
      setProgress(50);

      uploadChunkApi({ id: dirId, fileName: file.name, chunk: base64 }).then(
        (a) => {
          if (a.ok) {
            onUploadComplete && onUploadComplete();
            setProgress(100);
          } else {
            onFailed && onFailed(a.data.errors);
            console.error("sending error", file.name);
          }
        }
      );
    };
    reader.readAsDataURL(file);
  };

  const processFile = (file) => {
    let start = 0;
    let uploadId = "";
    size = file.size;
    const totalChunks = Math.ceil(size / sliceSize);
    const chunkIndex = 0;
    let end = 0;
    start = chunkIndex * sliceSize;
    end = start + sliceSize;
    send(file, start, end, chunkIndex, totalChunks, [], uploadId);
  };

  const send = async (
    file,
    start,
    end,
    chunkIndex,
    totalChunks,
    etags,
    uploadId
  ) => {
    if (chunkIndex >= totalChunks) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(",")[1];
      uploadChunkApi({
        dir,
        id: dirId,
        fileName: file.name,
        uploadId,
        chunkIndex,
        totalChunks,
        chunk: base64,
        eTags: etags,
      }).then((a) => {
        if (a.ok) {
          if (end < size) {
            chunkIndex = chunkIndex + 1;
            const newEnd = start + sliceSize * 2;
            const newStart = start + sliceSize;
            const percent = (chunkIndex / totalChunks) * 100;
            onProgress && onProgress(percent);
            setProgress(percent);
            //upload next slice
            send(
              file,
              newStart,
              newEnd,
              chunkIndex,
              totalChunks,
              a.data.eTags,
              a.data.uploadId
            );
          } else {
            onUploadComplete && onUploadComplete();
            setProgress(100);
          }
        } else {
          onFailed && onFailed(a.data.errors);
          console.error("sending error", file.name, chunkIndex, a.data);
        }
      });
    };

    const slicedPart = slice(file, start, end);
    reader.readAsDataURL(slicedPart);
  };

  const slice = (file, start, end) => {
    let slice = file.mozSlice
      ? file.mozSlice
      : file.webkitSlice
      ? file.webkitSlice
      : file.slice
      ? file.slice
      : noop;
    return slice.bind(file)(start, end);
  };
  const noop = () => {};
  if (children) {
    return React.cloneElement(children, {
      progress: progress,
    });
  } else {
    return <></>;
  }
};

export const ProgressBar = ({ progress, ...rest }) => (
  <div className="progress_bar">
    <div className="progress_inside" style={{ width: `${progress}%` }}></div>
  </div>
);

export default Uploader;
