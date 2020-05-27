import React from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const ArtWork = ({ artWork, ...props }) => {
  return (
    <LanguageContext.Consumer>
      {({ locale }) => (
        <div className="item">
          <div className="imgthumb">
            <a
              href={
                artWork.awardType == "person"
                  ? `/members/contestant/${artWork.id}`
                  : `/members/artwork/${artWork.id}`
              }
            >
              <img
                src={
                  artWork.awardType == "person" || artWork?.coverUrl == ""
                    ? "assets/images/logo.png"
                    : artWork?.coverUrl
                }
                alt={artWork.projectName[locale.code]}
              />
              <div className="mask">
                <div className="content">
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artWork.projectName[locale.code],
                      }}
                    ></p>
                  </>
                </div>
              </div>
            </a>
          </div>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default ArtWork;
