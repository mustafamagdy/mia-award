import React, { Component } from "react";

class TestUpload extends Component {
  render() {
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
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Uploader />
      </div>
    );
  }
}

const Uploader = props => {
  const sliceSize = 5000000; // Send 5MB Chunks
  let size = 0;
  let file = undefined;

  const processFile = files => {
    let start = 0;
    let uploadId = "";
    let etags = [];
    file = files[0];
    size = file.size;
    const totalChunks = Math.ceil(size / sliceSize);
    const chunkIndex = 0;
    let end = 0;
    start = chunkIndex * sliceSize;
    end = start + sliceSize;
    send(start, end, chunkIndex, totalChunks, [], uploadId);
  };

  const send = async (start, end, chunkIndex, totalChunks, etags, uploadId) => {
    console.log("etags ", etags);
    if (chunkIndex >= totalChunks) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function() {
      var dataUrl = reader.result;
      var base64 = dataUrl.split(",")[1];
      window.api.artworks
        .uploadChunk({
          fileName: file.name,
          uploadId,
          chunkIndex,
          totalChunks,
          chunk: base64,
          eTags: etags,
        })
        .then(a => {
          if (a.ok) {
            if (end < size) {
              console.log("respose => ", a.data);
              // console.log("progress %", (chunkIndex / totalChunks) * 100);
              chunkIndex = chunkIndex + 1;
              const newEnd = start + sliceSize * 2;
              const newStart = start + sliceSize;

              send(newStart, newEnd, chunkIndex, totalChunks, a.data.eTags, a.data.uploadId);
            } else {
              console.log("Upload complete");
            }
          } else {
            console.error('failed to upload ', a.data);
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

  return (
    <div>
      <input
        type="file"
        onChange={e => {
          if (e.target.files.length) {
            processFile(e.target.files);
          }
        }}
      ></input>
    </div>
  );
};

export default TestUpload;
