import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { Trans } from "@lingui/macro";
import homeActions from "store/home/actions";
import { useState } from "react";
import { Redirect } from "react-router-dom";

const Sponser = ({ sponser, ...props }) => {
  return (
    <LanguageContext.Consumer>
      {({ locale }) =>
        sponser ? (
          <section id="show_award">
            <div className="container sponser">
              <div className="award_area">
                <div className="imgthumb sponser">
                  <img src={sponser.logo} alt={sponser.name[locale.code]} />
                </div>
                <div className="txt sponser">
                  <div className="title">
                    <span>{sponser.name[locale.code]}</span>
                  </div>
                  <div className="desc">{sponser.content[locale.code]}</div>
                  <div className="links social_media">
                    {sponser.links.map((l, i) => (
                      <a target="_blank" href={l.url} rel="noopener noreferrer">
                        <i className={`icofont-${l.type}`}></i>
                      </a>
                    ))}
                  </div>{" "}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <Redirect to="/" />
        )
      }
    </LanguageContext.Consumer>
  );
};

const mapStateToProps = ({ router: { location }, home: { sponsers } }) => {
  const sponserId = location.pathname.split("/").pop();
  const sponser = sponsers.find((a) => a.id == sponserId);

  return {
    sponser,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Sponser);
