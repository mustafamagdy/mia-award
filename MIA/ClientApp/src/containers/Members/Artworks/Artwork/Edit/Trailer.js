import React,{ useEffect } from "react";
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
  const [uploadMode, setuploadMode] = useState(!artworkId && !trailerUrl)
  const handleUpdateTrailer = () => {
    setuploadMode(false)
  }
  useEffect(() => {
    setuploadMode(!artworkId && !trailerUrl)
  }, [artworkId,trailerUrl])

  return (
    <div className={classNames("tab_content tab_trailer", { active })}>
      <div className="trailer_area">
        {!uploadMode ? (
          <TrailerView url={trailerUrl} posterUrl={trailerPosterUrl} setuploadMode={setuploadMode} />
        ) :
          progress && progress.length > 0 ? (
            <UploadingProgress progress={progress} />
          ) : (
              <>
                <UploadDropZone 
                setFiles={setFiles} 
                accept="video/*"
                message='Upload your trailer'   
                multiple={false} 
                style={{ width: '100%', height: '100%' }} />
                <br/>
                <UploadDropZone 
                multiple={false}
                accept="image/*"
                setFiles={setFiles}
                message='Upload your trailer Poster'  
                style={{ width: '100%', height: '100%' }} />

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
                  {trailerUrl && uploadMode &&
                  (
                    <button onClick={ handleUpdateTrailer} >Cancel update</button>
                  )
                  }
                
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


const TrailerView = ({ url, posterUrl, setuploadMode, ...props }) => {
  const [mediaType, setmediaType] = useState('image');

  useEffect(() => {
    setmediaType(posterUrl && posterUrl !== '' ? 'image' : 'vedio')
  }, [posterUrl,url])

  const handleItemClicked = () => {
    setmediaType(mediaType == 'image' ? 'vedio' : 'vedio');
  }
  const handleUpdateTrailer = () => {
    setuploadMode(true)
  }
  return <> <span onClick={() => handleItemClicked()}>
    {mediaType == "image" ? (
      <img src={posterUrl} width='600px' height='300px' />
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
      </div>
    </>)}
  </span>

    <button onClick={() => handleUpdateTrailer()} >Update Trailer</button>
  </>
};

export default Trailer;
