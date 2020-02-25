import React, {useState, useLayoutEffect} from "react";
import {Trans} from "@lingui/macro";
import classNames from "classnames";
import {TransitionGroup, CSSTransition} from "react-transition-group";
import {useEffect} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import homeActions from "store/home/actions";
import {LanguageContext} from "containers/Providers/LanguageProvider";
import config from "config";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.css"

const AwardsSlider = ({awards, ...props}) => {
    useEffect(() => {
        setActiveKey(awards[0] && awards[0].code);
        setAwardsInSlider(awards);
    }, [awards]);

    const [activeKey, setActiveKey] = useState("");
    const [awardsInSlider, setAwardsInSlider] = useState([]);
    const [animateClass, setAnimateClass] = useState("");
    const [swiper, setSwiper] = useState(null);


    const nextAward = () => {
        // const item = awardsInSlider.shift();
        // setAwardsInSlider([...awardsInSlider, item]);
        // setActiveKey(awardsInSlider[0].code);
        // setAnimateClass("animatee");
        // setTimeout(() => {
        //   setAnimateClass("");
        // }, 1000);
        if (swiper !== null) {
            swiper.slideNext();
        }

    };

    const prevAward = () => {
        // const item = awardsInSlider.pop();
        // setAwardsInSlider([item, ...awardsInSlider]);
        // setActiveKey(item.code);
        if (swiper !== null) {
            swiper.slidePrev();
        }
    };


    return (
        <div id="apply_award">
            <div className="container">
                <div className="award_txt">
          <span>
            <Trans id="apply_for_your_award">apply for your award</Trans>
          </span>
                    <p>
                        <Trans id="home_general_award_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            Adipisci assumenda aut esse eveniet expedita facere in incidunt iusto nobis pariatur
                            praesentium quia quibusdam quo quod repellendus repudiandae unde, vel veritatis?Lorem ipsum
                            dolor sit amet, consectetur adipisicing elit. Alias est et inventore, ipsam itaque placeat
                            qui quisquam ratione, repellat repudiandae sequi, tempora temporibus tenetur velit
                            voluptatum. Aliquam ducimus molestias perferendis?</Trans>
                    </p>
                    <time>
                        <Trans id="start_from">starts from{"  "}</Trans>
                        <i>{config.awardDetails.startDate}</i>
                        <Trans id="to">
                            {"  "}to{"  "}
                        </Trans>
                        <i>{config.awardDetails.endDate}</i>
                    </time>
                    <a href="#" title="#">
                        <Trans id="view_all">view all</Trans>
                    </a>



                </div>
                <div className="award_slider">
                    <div className="slides_items">
                        {
                            awardsInSlider.length
                                ? <Awards awards={awardsInSlider} activeKey={activeKey} animateClass={animateClass}
                                          setSwiper={setSwiper}/>
                                : null
                        }
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

const Awards = ({awards, activeKey, animateClass, setSwiper}) => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        simulateTouch: true,
        getSwiper: swiper => {
            setSwiper(swiper);
        },
        breakpoints: {
            991: {
                slidesPerView: 2.5,
                spaceBetween: 20,
                simulateTouch: false,
                loop: true,
            }
        }
    };
    return (
        <Swiper {...params}>
            {
                awards.map((award, i) => (
                    <div key={award.code} className="slide-item">
                        <div className={classNames("slide_block", {
                            active: award.code === activeKey,
                            animateClass: award.code === activeKey ? animateClass : ""
                        })}>
                            <div className="imgthumb">
                                <img src={award.trophyUrl}/>
                            </div>
                            <div className="apply">
                                <a href={`/award/${award.id}`}>
                                    <Trans id="apply_now">apply now</Trans>
                                </a>
                            </div>
                            <LanguageContext.Consumer>
                                {({locale}) => (
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
                    </div>
                ))
            }
        </Swiper>
    );
};

const mapStateToProps = ({home: {awards}}) => ({awards});
const mapDispatchToProps = dispatch => bindActionCreators({...homeActions}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AwardsSlider);
