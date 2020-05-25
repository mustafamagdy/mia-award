import React from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const ArtWork = ({ artWork, ...props }) => {
  return (
    <div className="item">
      <div className="imgthumb">
        <a
          href={
            artWork.awardType == "person"
              ? `/members/contestant/${artWork.id}`
              : `/members/artwork/${artWork.id}`
          }
        >
          <img src={artWork?.coverUrl} />
          <div className="mask">
            <div className="content">
              <LanguageContext.Consumer>
                {({ locale }) => (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artWork.projectName[locale.code],
                      }}
                    ></p>
                  </>
                )}
              </LanguageContext.Consumer>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default ArtWork;
