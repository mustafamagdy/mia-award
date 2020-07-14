import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Trans } from "@lingui/macro";
import homeActions from "store/home/actions";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Award = ({ location, awards, currency, props }) => {
  const [awardId, setAwardId] = useState(undefined);
  const [award, setAward] = useState(undefined);

  useEffect(() => {
    const _id = location.pathname.split("/").pop();
    setAwardId(_id);
  }, [location.pathname]);

  useEffect(() => {
    setAward(awards.find((a) => a.id == awardId));
  }, [awardId, awards]);

  return (
    <LanguageContext.Consumer>
      {({ locale }) =>
        award && (
          <section id="show_award">
            <div className="container">
              <div className="award_area">
                <div className="imgthumb">
                  <img src="/assets/images/big_award.png" />
                </div>
                <div className="txt">
                  <div className="title">
                    <span>{award.title[locale.code]}</span>
                    {/* <span>
                      {award.artworkFee} {currency}
                    </span> */}
                  </div>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: award.description[locale.code],
                    }}
                  ></div>
                  <div className="download">
                    <a
                      href={`/assets/files/award_${award.awardType}.${locale.code}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/assets/images/pdf_icon.png" alt="Terms" />
                    </a>
                    <a
                      href={`/assets/files/mia.${locale.code}.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/assets/images/pdf_icon.png" alt="Media kit" />
                    </a>
                  </div>
                  <div className="applynow">
                    <NavLink to="/members">
                      <Trans id="apply_for_award">APPLY FOR AWARD</Trans>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      }
    </LanguageContext.Consumer>
  );
};

const mapStateToProps = ({
  global: { currency },
  home: { awards },
  router: { location },
}) => ({
  currency,
  awards,
  location,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Award);
