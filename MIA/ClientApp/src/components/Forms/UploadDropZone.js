import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadDropZone = ({ setFiles, setFile, style, accept, multiple, className, iconClass, message, setProgress, progress, ...props }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
        if (setProgress) {
            acceptedFiles.map(file => {
                progress.push({ key: file.name, percent: 0, size: file.size })
            })
            setProgress([...progress])
        }

    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: accept, multiple: multiple });

    return (
        <div className={className} {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            <i className={iconClass}></i>
            <p>{message}</p>
        </div>
    );
};

export default UploadDropZone;