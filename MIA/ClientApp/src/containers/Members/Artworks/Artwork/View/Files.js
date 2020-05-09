import React, { useState, useEffect } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import Lightbox from "lightbox-react";
import classNames from "classnames";
import ReactPlayer from "react-player";


const Files = ({ files, posterUrl, coverUrl, active, title, ...props }) => {
  const [currentItem, setCurrentItem] = useState(undefined);

  const handleItemClicked = fileUrl => {
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
      <RenderLightBox currentItem={currentItem} setCurrentitem={setCurrentItem} />

      <div className={classNames("tab_content tab_files", { active })}>
        <div className="item_show">
          <div className="season_content">
            <ol class="items">
              {files &&
                files.map((file, i) => {
                  return (
                    <File
                      title={title}
                      posterUrl={posterUrl}
                      coverUrl={coverUrl}
                      file={file}
                      key={i}
                      itemClicked={f => {
                        handleItemClicked(f.fileUrl);
                      }}
                    />
                  );
                })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

const Video = ({ url }) => <ReactPlayer controls url={url} className="react-player-lightbox" width="90%" height="90%" />;

const File = ({ file, coverUrl, posterUrl, itemClicked, title, ...props }) => {
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
            <LanguageContext.Consumer>{({ locale }) => <p>{title[locale.code]}</p>}</LanguageContext.Consumer>
            {/* <Rating rate={show.rating} readonly /> */}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Files;