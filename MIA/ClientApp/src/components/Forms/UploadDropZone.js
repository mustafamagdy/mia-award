import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const UploadDropZone = ({ setFiles,setFile, style,accept,multiple,className,iconClass, message, ...props }) => {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);
    const { getRootProps, getInputProps } = useDropzone({ onDrop,accept:accept,multiple:multiple });

    return (
        <div className={className} {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            <i className={iconClass}></i>
            <p>{message}</p>
        </div>
    );
};

export default UploadDropZone;