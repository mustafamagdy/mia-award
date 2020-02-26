import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadDropZone = ({ setFiles,setFile, style,accept,multiple, message, ...props }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop,accept:accept,multiple:multiple });

    return (
        <div className="upload_trailer" {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            <i className="icofont-plus"></i>
            <span>{message}</span>
        </div>
    );
};

export default UploadDropZone;