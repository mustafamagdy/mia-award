(function() {
  var $files = document.getElementById("f");

  $files.addEventListener(
    "change",
    function() {
      if ($files.files.length) {
        processFile($files);
      }
    },
    false
  );
  const sliceSize = 5000000; // Send 5MB Chunks
  var size = 0;
  const xhr = new XMLHttpRequest();
  let chunkIndex = 0;
  let totalChunks = 0;
  let file = undefined;

  function processFile($files) {
    file = $files.files[0];
    size = file.size;
    let start = 0;
    totalChunks = Math.ceil(size / sliceSize);
    send(start, sliceSize);
  }

  function send(start, end) {
    if (chunkIndex >= totalChunks) {
      return;
    }
    if (end < size) {
      xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          console.log("Done Sending Chunk ->", chunkIndex, "status", xhr.status, "response", xhr.responseText);
          chunkIndex = chunkIndex + 1;

          end = start + sliceSize * 2;
          start = start + sliceSize;
          send(start, end);
        }
      };
    } else {
      console.log("Upload complete");
    }

    xhr.open("POST", "http://localhost:62912/api/large/upload-chunk", true);

    const slicedPart = slice(file, start, end);

    const formdata = new FormData();
    formdata.append(
      "fileName",
      file.name
        .split(".")
        .slice(0, -1)
        .join(".")
    );
    formdata.append("chunkIndex", chunkIndex);
    formdata.append("totalChunks", totalChunks);
    formdata.append("chunk", slicedPart);
    formdata.append("ext", file.name.split(".").pop());

    xhr.send(formdata);
  }

  function slice(file, start, end) {
    let slice = file.mozSlice ? file.mozSlice : file.webkitSlice ? file.webkitSlice : file.slice ? file.slice : noop;
    return slice.bind(file)(start, end);
  }

  function noop() {}
})();
