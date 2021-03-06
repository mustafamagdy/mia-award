import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Trans, t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { bindActionCreators } from "redux";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import config from "config";
import { NavLink } from "react-router-dom";
// import "sass/recent_shows.scss";

const RecentShows = ({
  fetchRecentShows,
  recentShows,
  countries,
  generas,
  years,
  pageCount,
  ...props
}) => {
  const { register, handleSubmit, reset, formState } = useForm();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState({});
  const [usingFilter, setUsingFilter] = useState(false);

  useEffect(() => {
    fetchRecentShows({ pageNumber, pageSize: 10, ...searchQuery });
  }, [searchQuery, pageNumber]);

  useEffect(() => {
    setUsingFilter(false);
    fetchRecentShows({ pageNumber, pageSize: 10 });
  }, []);

  const onSubmit = (values) => {
    values.year = values.year == "any_year" ? 0 : values.year;
    setUsingFilter(true);
    setSearchQuery({ ...values });
  };

  return (
    <div id="recent_shows">
      <div className="container">
        <div className="title">
          <Trans id="recent_shows">recent shows</Trans>
        </div>
        {((recentShows && recentShows.length > 0) || usingFilter) && (
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
                  <select ref={register} name="year">
                    {years.map((y, i) => (
                      <option key={i} value={y}>
                        {i18n._(y)}
                      </option>
                    ))}
                  </select>
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
                  <button type="submit" disabled={formState.isSubmitting}>
                    <i className="icofont-ui-search"></i>
                  </button>
                </form>
              )}
            </I18n>
          </div>
        )}
        {(recentShows && recentShows.length > 0) || usingFilter ? (
          <>
            <div className="shows_items">
              {recentShows.map((show, i) => (
                <div className="item" key={show.id}>
                  <div className="imgthumb">
                    <NavLink to={`/shows/${show.id}`}>
                      <img src={show.posterUrl} />
                      <div className="mask">
                        <div className="content">
                          <LanguageContext.Consumer>
                            {({ locale }) => (
                              <p>{show.projectName[locale.code]}</p>
                            )}
                          </LanguageContext.Consumer>
                          {/* <Rating rate={show.rating} readonly /> */}
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              pageCount={pageCount}
              pageNumber={pageNumber}
              setPageNumber={setPageNumber}
            />
          </>
        ) : (
          // no_shows_available_yet
          <I18n>
            {({ i18n }) => {
              return i18n.language == "ar" ? (
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html:
                      "?????? ???????? ?????????????? ???? ?????????? ???????????? ???????? ?????? ?????????? ?????????? ???? ?????? ?????????????? ???????????? ???????????????? ?????????? ??????????<br>???????? ?????????? ?????????????????? ???? ?????? ???????????? ???????????? ????????",
                  }}
                ></div>
              ) : (
                <div
                  className="title"
                  dangerouslySetInnerHTML={{
                    __html:
                      "For all media makers in the Arab world, <br>you are so close to be honoured globally by the Grand Award.<br>A Challenge worth participation.<br>Be on time to present your works.",
                  }}
                ></div>
              );
            }}
          </I18n>
        )}
      </div>
    </div>
  );
};

const Rating = ({ rate, ...props }) => {
  const maxRating = 5;
  return (
    <div className="stars">
      {rate > 0 &&
        new Array(rate)
          .fill()
          .map((_, a) => <i className="icofont-ui-rating" key={a}></i>)}
      {maxRating - rate > 0 &&
        new Array(maxRating - rate)
          .fill()
          .map((_, a) => <i className="icofont-ui-rate-blank" key={a}></i>)}
    </div>
  );
};

const Pagination = ({ pageCount, pageNumber, setPageNumber, ...props }) => {
  return (
    <div className="paginations">
      <ul>
        {new Array(pageCount).fill().map((_, i) => {
          return (
            <li
              key={i}
              className={classNames({ current: pageNumber == i + 1 })}
            >
              <span onClick={() => setPageNumber(i + 1)}>{i + 1}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = ({
  home: {
    recentShows,
    recentShows_pagination: { pageCount },
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
  return {
    recentShows,
    years,
    pageCount,
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecentShows);
