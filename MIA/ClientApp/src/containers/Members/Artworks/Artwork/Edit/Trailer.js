import React from "react";
import classNames from "classnames";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ReactPlayer from "react-player";
import Uploader from 'components/Forms/Uploader'
import UploadDropZone from 'components/Forms/UploadDropZone'

const Trailer = ({ active, artworkId, trailerUrl, trailerPosterUrl, updateTrailer, ...props }) => {

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);



  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {artworkId && trailerUrl ? (
          <TrailerView url={trailerUrl} posterUrl={trailerPosterUrl} />
        ) :
          progress && progress.length > 0 ? (
            <UploadingProgress progress={progress} />
          ) : (
              <>
                <UploadDropZone setFiles={setFiles} style={{ width: '100%', height: '100%' }} />

                {files &&
                  files.map(f => {
                    return <Uploader
                      key={f.name}
                      uploadChunkApi={window.api.members.updateTrailer}
                      dir={"Artwork"}
                      dirId={artworkId}
                      onProgress={p => {
                        debugger
                        const indx = progress.findIndex(a => a.key == f.name);
                        if (indx != -1) progress[indx].percent = p;
                        else progress.push({ key: f.name, percent: p });
                        setProgress([...progress]);
                      }}
                      file={f}
                    />
                  }
                  )}

              </>
            )}
      </div>
    </div>
  );
};

const UploadingProgress = ({ progress, props }) => <div style={{ border: "2px solid red", width: 400, height: 300 }}>
  {progress &&
    progress.map(p => (
      <div key={p.key}>
        {p.key} => : {p.percent}
      </div>
    ))}
</div>;


const TrailerView = ({ url, posterUrl, ...props }) => {
  const [mediaType, setmediaType] = useState(posterUrl && posterUrl !== '' ? 'image' : 'vedio')
  const handleItemClicked = () => {
    setmediaType(mediaType == 'image' ? 'vedio' : 'vedio');
  }
  return <span onClick={() => handleItemClicked()}>
    {mediaType == "image" ? (
      <img src={posterUrl} />
    ) : (<>
      <ReactPlayer
        playing
        url={url}
        className="react-player"
        width="100%"
        height="100%"
        light="https://picsum.photos/200/300"
      />
      <div className="zoom_image">
        <span>
          <i className="icofont-ui-zoom-in"></i>
        </span>
      </div></>)}
  </span>
};

export default Trailer;
