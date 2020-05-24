import React, { useState, useEffect } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import Lightbox from "lightbox-react";
import classNames from "classnames";
import ReactPlayer from "react-player";
import { Trans } from "@lingui/macro";

const Files = ({
  files,
  posterUrl,
  coverUrl,
  active,
  projectName,
  ...props
}) => {
  const [currentItem, setCurrentItem] = useState(undefined);

  const handleItemClicked = (fileUrl) => {
    setCurrentItem(<Video url={fileUrl} />);
  };

  const RenderLightBox = ({ currentItem, setCurrentitem, ...props }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(currentItem != undefined);
    }, [currentItem]);

    return isOpen ? (
      <Lightbox
        mainSrc={currentItem}
        onCloseRequest={() => {
          setCurrentitem(undefined);
        }}
      />
    ) : null;
  };

  return (
    <>
      <RenderLightBox
        currentItem={currentItem}
        setCurrentitem={setCurrentItem}
      />

      <div className={classNames("tab_content tab_upload_videos", { active })}>
        {files && files.length > 0 ? (
          <div className="season_content">
            <div className="item_show">
              <ol className="items">
                {files.map((file, i) => {
                  return (
                    <File
                      projectName={projectName}
                      posterUrl={posterUrl}
                      coverUrl={coverUrl}
                      file={file}
                      key={i}
                      itemClicked={(f) => {
                        handleItemClicked(f.fileUrl);
                      }}
                    />
                  );
                })}
              </ol>
            </div>
          </div>
        ) : (
          <p className="info">
            <Trans id="no_files_uploaded">No files uploaded</Trans>
          </p>
        )}
      </div>
    </>
  );
};

const Video = ({ url }) => (
  <ReactPlayer
    controls
    url={url}
    className="react-player-lightbox"
    width="90%"
    height="90%"
  />
);

const File = ({
  file,
  coverUrl,
  posterUrl,
  itemClicked,
  projectName,
  ...props
}) => {
  return (
    <li
      className="item"
      key={file.id}
      onClick={() => {
        itemClicked && itemClicked(file);
      }}
    >
      <div className="imgthumb">
        <img src={posterUrl} />
        <div className="mask">
          <div className="content">
            <LanguageContext.Consumer>
              {({ locale }) => <p>{projectName[locale.code]}</p>}
            </LanguageContext.Consumer>
            {/* <Rating rate={show.rating} readonly /> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Files;
