import React, { useState, useEffect } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import Lightbox from "lightbox-react";
import classNames from "classnames";
import ReactPlayer from "react-player";
import { Trans } from "@lingui/macro";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { I18n } from "@lingui/react";

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
                      coverUrl={encodeURI(coverUrl)}
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
    playing
    controls
    url={url}
    className="react-player-lightbox"
    width="90%"
    height="90%"
  />
);

export const File = ({
  file,
  coverUrl,
  posterUrl,
  itemClicked,
  projectName,
  showRemove,
  removeArtworkFile,
  ...props
}) => {
  return (
    <LanguageContext.Consumer>
      {({ locale }) => (
        <li
          className="item"
          key={file.id}
          onClick={() => {
            itemClicked && itemClicked(file);
          }}
        >
          <div className="imgthumb">
            <img
              src={
                posterUrl == "" ? "/assets/images/logo.png" : encodeURI(posterUrl)
              }
              alt={projectName[locale.code]}
            />
            <div className="mask">
              <div className="content">
                <p>{projectName[locale.code]}</p>
                {/* <Rating rate={show.rating} readonly /> */}
              </div>
              {showRemove && (
                <I18n>
                  {({ i18n }) => (
                    <button
                      onClick={async () => {
                        confirmAlert({
                          title: i18n._("confirm_delete"),
                          message: i18n._("are_you_sure_to_delete"),
                          buttons: [
                            {
                              label: i18n._("yes"),
                              onClick: () => {
                                removeArtworkFile && removeArtworkFile(file);
                              },
                            },
                            {
                              label: i18n._("no"),
                              onClick: () => {},
                            },
                          ],
                        });
                      }}
                    >
                      <Trans id="remove_file">Remove file</Trans>
                    </button>
                  )}
                </I18n>
              )}
            </div>
          </div>
        </li>
      )}
    </LanguageContext.Consumer>
  );
};

export default Files;
