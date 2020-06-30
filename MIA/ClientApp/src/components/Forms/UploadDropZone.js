import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Trans } from "@lingui/macro";

const UploadDropZone = ({
  setFiles,
  setFile,
  style,
  accept,
  multiple,
  className,
  iconClass,
  message,
  setProgress,
  progress,
  extensions,
  minSize,
  ...props
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    let accFiles = [];
    if (extensions && extensions.length > 0) {
      acceptedFiles.map((file) => {
        if (extensions.includes(file.type)) {
          accFiles.push(file);
        }
      });
    } else {
      accFiles = [...acceptedFiles];
    }

    const _filteredSizes = [];
    if (minSize) {
      accFiles.map((f) => {
        if (f.size >= minSize * 1024 * 1024) {
          _filteredSizes.push(f);
        }
      });

      accFiles = [..._filteredSizes];
    }

    setFiles(accFiles);
    if (setProgress) {
      accFiles.map((file) => {
        progress.push({ key: file.name, percent: 0, size: file.size });
      });
      setProgress([...progress]);
    }
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: accept,
    multiple: multiple,
  });

  return (
    <div className={className} {...getRootProps()} style={style}>
      <input {...getInputProps()} />
      <i className={iconClass}></i>
      <p>{message}</p>
      {minSize && (
        <div className="hint">
          <Trans id="min_size">File minimum size: </Trans>
          {minSize} <Trans id="mb">MB</Trans>
        </div>
      )}
    </div>
  );
};

export default UploadDropZone;
