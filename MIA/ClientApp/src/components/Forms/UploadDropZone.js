import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadDropZone = ({ setFiles, style, ...props }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    return (
        <div className="upload_trailer" {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            <i className="icofont-plus"></i>
            <span>Upload your trailer</span>
        </div>
    );
};

export default UploadDropZone;