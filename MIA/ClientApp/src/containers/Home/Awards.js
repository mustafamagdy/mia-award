import React, { useState, useLayoutEffect } from "react";
import { Trans } from "@lingui/macro";
import classNames from "classnames";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const AwardsSlider = ({ awards, ...props }) => {
  useEffect(() => {
    setActiveKey(awards[0] && awards[0].code);
    setAwardsInSlider(awards);
  }, [awards]);

  const [activeKey, setActiveKey] = useState("");
  const [awardsInSlider, setAwardsInSlider] = useState([]);

  const nextAward = () => {
    const item = awardsInSlider.shift();
    setAwardsInSlider([...awardsInSlider, item]);
    setActiveKey(awardsInSlider[0].code);
  };

  const prevAward = () => {
    const item = awardsInSlider.pop();
    setAwardsInSlider([item, ...awardsInSlider]);
    setActiveKey(item.code);
  };

  return (
    <div id="apply_award">
      <div className="container">
        <div className="award_txt">
          <span>
            <Trans id="apply_for_your_award">apply for your award</Trans>
          </span>
          <p>
            <Trans id="home_general_award_text">
              brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of
              .
            </Trans>
          </p>
          <time>
            <Trans id="start_from">starts from{"  "}</Trans>
            <i>01-03-2020</i>
            <Trans id="to">
              {"  "}to{"  "}
            </Trans>
            <i>20-05-2020</i>
          </time>
          {/* <a href="#" title="#">
            <Trans id="view_all">view all</Trans>
          </a> */}
        </div>
        <div className="award_slider">
          <div className="slides_items">
            <Awards awards={awardsInSlider} activeKey={activeKey} />
          </div>
          <div className="slider_nav">
            <button type="button" className="arrow_prev" onClick={prevAward}>
              <i className="icofont-simple-left"></i>
            </button>
            <button type="button" className="arrow_next" onClick={nextAward}>
              <i className="icofont-simple-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Awards = ({ awards, activeKey }) => {
  return (
    awards &&
    awards.map((award, i) => {
      return (
        <div key={award.code} className={classNames("slide_block", { active: award.code == activeKey })}>
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <div className="apply">
            <a href={`/award/${award.id}`}>
              <Trans id="apply_now">apply now</Trans>
            </a>
          </div>
          <LanguageContext.Consumer>
            {({ locale }) => (
              <>
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html: award.title[locale.code]
                  }}
                ></div>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: award.description[locale.code]
                  }}
                ></div>
              </>
            )}
          </LanguageContext.Consumer>
        </div>
      );
    })
  );
};

const mapStateToProps = ({ home: { awards } }) => ({ awards });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AwardsSlider);
