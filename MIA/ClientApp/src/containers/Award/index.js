import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Trans } from "@lingui/macro";
import homeActions from "store/home/actions";
import { useState } from "react";

const Award = ({ location, awards, currency, props }) => {
  useEffect(() => {
    const _id = location.pathname.split("/").pop();
    setAwardId(_id);
    console.log("set id", _id);
  }, []);

  useEffect(() => {
    console.log("id ", awardId);
    setAward(awards.find((a) => a.id == awardId));
  }, [awardId, awards]);

  const [awardId, setAwardId] = useState(undefined);
  const [award, setAward] = useState(undefined);

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
                    <span>
                      {award.artworkFee} {currency}
                    </span>
                  </div>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html: award.description[locale.code],
                    }}
                  ></div>
                  <div className="download">
                    <a href="#">
                      <img src="/assets/images/pdf_icon.png" />
                    </a>
                    <a href="#">
                      <img src="/assets/images/pdf_icon.png" />
                    </a>
                    <a href="#">
                      <img src="/assets/images/pdf_icon.png" />
                    </a>
                    <a href="#">
                      <img src="/assets/images/pdf_icon.png" />
                    </a>
                  </div>
                  <div className="applynow">
                    <a href="#">
                      <Trans id="apply_for_award">APPLY FOR AWARD</Trans>
                    </a>
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
