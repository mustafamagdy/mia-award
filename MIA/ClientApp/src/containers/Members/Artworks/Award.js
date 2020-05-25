import React from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Trans } from "@lingui/macro";
import { NavLink } from "react-router-dom";

const Award = ({ award, ...props }) => {
  return (
    <div className="award_col">
      <div className="award_block">
        <div className="show_one">
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <LanguageContext.Consumer>
            {({ locale }) => (
              <>
                <div
                  className="name"
                  dangerouslySetInnerHTML={{
                    __html: award.title[locale.code],
                  }}
                ></div>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: award.description[locale.code],
                  }}
                ></div>
              </>
            )}
          </LanguageContext.Consumer>
        </div>
        <div className="show_two">
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <div className="apply">
            <NavLink to={`/award/${award.id}`}>
              <Trans id="view_award">view award</Trans>
            </NavLink>
          </div>
          <div className="name">{award.code}</div>
        </div>
      </div>
    </div>
  );
};

export default Award;
