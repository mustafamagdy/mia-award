import React, { Component, useCallback } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useEffect } from "react";
import { Uploader, ProgressBar } from "components/Forms";

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
          >
            <FileDetails file={f} />
          </Uploader>
        ))}
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
    </div>
  );
};

const FileDetails = ({ progress, file, ...props }) => (
  <div>
    <label> {file.name}</label>
    <ProgressBar progress={progress} />
  </div>
);

export default TestUpload;
