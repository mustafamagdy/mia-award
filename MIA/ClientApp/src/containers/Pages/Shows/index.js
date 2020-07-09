import React, { useState } from "react";
import { I18n } from "@lingui/react";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import showsActions from "store/shows/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import ReactPlayer from "react-player";
import { useEffect } from "react";
import Swiper from "react-id-swiper";
import Paginator from "components/Paginator";
import "lightbox-react/style.css"; // This only needs to be imported once in your app
import "swiper/css/swiper.css";
import { useForm } from "react-hook-form";
import config from "config";

const Shows = ({
  fetchFeaturedItems,
  fetchItems,
  featuredItems,
  items,
  // countries,
  // generas,
  years,
  pageCount,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [] = useState(undefined);
  const [swiper, setSwiper] = useState(null);
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    fetchFeaturedItems();
  }, []);

  useEffect(() => {
    fetchItems({
      pageNumber,
      pageSize: 10,
      ...searchQuery,
    });
  }, [pageNumber, activeTab, searchQuery]);

  const onSubmit = (values) => {
    values.year = values.year == "any_year" ? 0 : values.year;
    setSearchQuery({ ...values });
  };

  const params = {
    effect: "coverflow",
    spaceBetween: 0,
    speed: 1000,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    rebuildOnUpdate: true,
    pagination: {
      el: ".slider_dots",
      clickable: true,
    },
  };

  return featuredItems != undefined && featuredItems.length > 0 ? (
    <section id="show_all">
      <div className="show_slider">
        <div className="container">
          <div className="slider_area">
            <div className="slider_nav">
              <button type="button" className="arrow_prev">
                <i className="icofont-simple-left"></i>
              </button>
              <button type="button" className="arrow_next">
                <i className="icofont-simple-right"></i>
              </button>
            </div>
            <div className="slider_items">
              <Swiper {...params} getSwiper={setSwiper}>
                {featuredItems.map((item) => (
                  <div key={item.id} className="item">
                    <div className="imgthmb">
                      <img src={item.posterUrl} />
                    </div>
                    <div className="content">
                      <div className="title">
                        <span>
                          <LanguageContext.Consumer>
                            {({ locale }) => item.projectName[locale.code]}
                          </LanguageContext.Consumer>
                        </span>
                        <time>
                          <Trans id="production_year">Production Year</Trans> :{" "}
                          {item.productionYear}
                        </time>
                      </div>
                      <div className="video_item">
                        <ReactPlayer
                          controls
                          url={item.trailerUrl}
                          className="react-player"
                          width="100%"
                          height="100%"
                          light={encodeURI(item.coverUrl)}
                        />
                      </div>
                      <div className="video_details">
                        <div className="info_item">
                          <ul>
                            <li>
                              <span>
                                <Trans id="release-date">Date of release</Trans>{" "}
                                :
                              </span>
                              <p>{item.broadcastYear}</p>
                            </li>
                          </ul>
                        </div>
                        <div className="user_item">
                          <div className="desc">
                            <span>
                              <Trans id="user_account">User Account</Trans>
                            </span>
                            <p>{item.nomineeName}</p>
                          </div>
                          <div className="imgthumb">
                            <img
                              src={`${item.nomineeAvatar}?w=110&h=100&mode=stretch`}
                              alt={item.nomineeName}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="more">
                        <a href={`/shows/${item.id}`}>
                          <Trans id="view">View</Trans>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </Swiper>
            </div>
            <div className="slider_dots"></div>
          </div>
        </div>
      </div>
      <div className="show_blocks">
        <div className="container">
          <div className="search_filter">
            <I18n>
              {({ i18n }) => (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    ref={register}
                    name="title"
                    placeholder={i18n._("show_name")}
                  />
                  <I18n>
                    {({ i18n }) => (
                      <select ref={register} name="year">
                        {years.map((y, i) => (
                          <option value={y}>{i18n._(y)}</option>
                        ))}
                      </select>
                    )}
                  </I18n>

                  <input
                    type="text"
                    ref={register}
                    name="tvchannels"
                    placeholder={i18n._("tv_channels")}
                  />
                  <input
                    type="text"
                    ref={register}
                    name="onlineChannels"
                    placeholder={i18n._("online_channels")}
                  />
                  <button type="submit">
                    <i className="icofont-ui-search"></i>
                  </button>
                </form>
              )}
            </I18n>
          </div>
          <div className="shows_items">
            {items.map((item) => (
              <Show key={item.id} show={item} />
            ))}
          </div>
          <Paginator
            pageCount={pageCount}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
      </div>
    </section>
  ) : (
    <section id="show_all">
      <div className="show_slider">
        <div className="container">
          <I18n>
            {({ i18n }) => {
              return i18n.language == "ar" ? (
                <div
                  className="empty_title"
                  dangerouslySetInnerHTML={{
                    __html:
                      "لكل صناع الإعلام في الوطن العربي أنتم على مسافة قريبة من نيل الجائزة الكبرى وتكريمكم بطابع عالمي<br>تحدي يستحق المشاركة، كن على الموعد لتقديم عملك",
                  }}
                ></div>
              ) : (
                <div
                  className="empty_title"
                  dangerouslySetInnerHTML={{
                    __html:
                      "For all media makers in the Arab world, <br>you are so close to be honoured globally by the Grand Award.<br>A Challenge worth participation.<br>Be on time to present your works.",
                  }}
                ></div>
              );
            }}
          </I18n>
        </div>
      </div>
    </section>
  );
};

const Show = ({ show }) => (
  <div className="item">
    <div className="imgthumb">
      <a href={`/shows/${show.id}`}>
        <img src={show.posterUrl} />
        <div className="mask">
          <div className="content">
            <p>
              <LanguageContext.Consumer>
                {({ locale }) => show.projectName[locale.code]}
              </LanguageContext.Consumer>
            </p>
            {/* <Stars /> */}
          </div>
        </div>
      </a>
    </div>
  </div>
);

const mapStateToProps = ({
  // home: {
  //   shows_years: years,
  // },
  shows: {
    items,
    featuredItems,
    items_pagination: { pageCount },
  },
}) => {
  const years = [];
  for (
    let y = config.validationRules.allowed_artwork_years.min;
    y <= config.validationRules.allowed_artwork_years.max;
    y++
  ) {
    years.push(y);
  }
  years.unshift("any_year");
  return { items, featuredItems, pageCount, years };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...showsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Shows);
