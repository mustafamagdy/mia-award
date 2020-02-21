import React, { Component, useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";

const UploadDropZone = ({ setFiles, style, ...props }) => {
  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} style={style}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );
};

const TestUpload = props => {
  const [progress, setProgress] = useState([]);
  const [files, setFiles] = useState([]);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {/* <div style={{ border: "2px dashed gray", "border-radius": "10px", width: 200, height: 200 }} onDrop></div> */}
      <UploadDropZone setFiles={setFiles} style={{ border: "2px dashed gray", borderRadius: "10px", width: 200, height: 200 }} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {files &&
        files.map(f => (
          <Uploader
            key={f.name}
            uploadChunkApi={window.api.members.postFileChunk}
            dir={"Artwork"}
            dirId={"artworkId__1"}
            onProgress={p => {
              const indx = progress.findIndex(a => a.key == f.name);
              if (indx != -1) progress[indx].percent = p;
              else progress.push({ key: f.name, percent: p });
              setProgress([...progress]);
            }}
            file={f}
          />
        ))}
      <br />
      <br />
      <br />
      <br />
      <div style={{ border: "2px solid red", width: 400, height: 300 }}>
        {progress &&
          progress.map(p => (
            <div key={p.key}>
              {p.key} => : {p.percent}
            </div>
          ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

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
  ...props
}) => {
  const sliceSize = sliceSizeInMb * 1024 * 1024; // Send 5MB Chunks
  let size = 0;

  useEffect(() => {
    if (file && file.size > 0) {
      processFile(file);
    }
  }, [file]);

  const processFile = file => {
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

  const send = async (file, start, end, chunkIndex, totalChunks, etags, uploadId) => {
    if (chunkIndex >= totalChunks) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(",")[1];
      console.log("sending ", file.name, chunkIndex);
      uploadChunkApi({ dir, id: dirId, fileName: file.name, uploadId, chunkIndex, totalChunks, chunk: base64, eTags: etags }).then(a => {
        if (a.ok) {
          if (end < size) {
            chunkIndex = chunkIndex + 1;
            const newEnd = start + sliceSize * 2;
            const newStart = start + sliceSize;
            const percent = (chunkIndex / totalChunks) * 100;
            onProgress && onProgress(percent);
            //upload next slice
            send(file, newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
          } else {
            onUploadComplete && onUploadComplete();
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
    let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : noop;
    return slice.bind(file)(start, end);
  };
  const noop = () => {};
  return <></>;
};

export default TestUpload;
