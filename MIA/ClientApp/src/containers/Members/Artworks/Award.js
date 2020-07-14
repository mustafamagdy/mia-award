import React from "react";
import { I18n } from "@lingui/react";

const Award = ({ award, ...props }) => {
  const artworks = [];
  if (award.firstPlace) {
    artworks.push({ order: "first", ...award.firstPlace });
  }
  if (award.secondPlace) {
    artworks.push({ order: "second", ...award.secondPlace });
  }

  return artworks.map((artwork, i) => (
    <div className="award_col winner" key={i}>
      <div className="award_block">
        <div className="show_one">
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <I18n>
            {({ i18n }) => (
              <>
                <div className="name">{award.title[i18n.language]}</div>
                <div className="artwork">
                  {`${artwork.projectName[i18n.language]} (${i18n._(
                    artwork.order
                  )})`}
                </div>
              </>
            )}
          </I18n>
        </div>
      </div>
    </div>
  ));
};

export default Award;
