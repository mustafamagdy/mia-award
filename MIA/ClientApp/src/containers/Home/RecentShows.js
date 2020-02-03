import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { bindActionCreators } from "redux";

// import "sass/recent_shows.scss";

const RecentShows = ({ fetchRecentShows, recentShows, categories, countries, generas, years, pageCount, ...props }) => {
  const { register, handleSubmit, reset } = useForm();
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState({});

  useEffect(() => {
    fetchRecentShows({ pageNumber, pageSize: 10, ...searchQuery });
  }, [searchQuery, pageNumber]);

  useEffect(() => {
    fetchRecentShows({ pageNumber, pageSize: 10 });
  }, []);

  const onSubmit = values => {
    setSearchQuery({ ...values });
  };

  return (
    <div id="recent_shows">
      <div className="container">
        <div className="title">
          <Trans id="recent_shows">recent shows</Trans>
        </div>
        <div className="search_filter">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" ref={register} name="title" placeholder="show title" />
            <select ref={register} name="year">
              {generas.map((y, i) => (
                <option value={y}>{y}</option>
              ))}
            </select>
            <select ref={register} name="category">
              {generas.map((c, i) => (
                <option value={c}>
                  <Trans id={c}>{c}</Trans>
                </option>
              ))}
            </select>
            <select ref={register} name="genera">
              {generas.map((g, i) => (
                <option value={g}>
                  <Trans id={g}>{g}</Trans>
                </option>
              ))}
            </select>
            <select ref={register} name="country">
              {countries.map((c, i) => (
                <option value={c}>
                  <Trans id={c}>{c}</Trans>
                </option>
              ))}
            </select>
            <button type="submit">
              <i className="icofont-ui-search"></i>
            </button>
          </form>
        </div>
        {recentShows && recentShows.length > 0 ? (
          <>
            <div className="shows_items">
              {recentShows.map((show, i) => (
                <div className="item" key={show.id}>
                  <div className="imgthumb">
                    <a href={`/shows/${show.id}`}>
                      <img src={`assets/images/${show.poster}.png`} />
                      <div className="mask">
                        <div className="content">
                          <p>{show.title}</p>
                          <Rating rate={show.rating} readonly />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <Pagination pageCount={pageCount} pageNumber={pageNumber} setPageNumber={setPageNumber} />
          </>
        ) : (
          <div className="title">
            <Trans id="no_shows_available_yet">No Shows Available Yet</Trans>
          </div>
        )}
      </div>
    </div>
  );
};

const Rating = ({ rate, ...props }) => {
  const maxRating = 5;
  return (
    <div className="stars">
      {rate > 0 && new Array(rate).fill().map((_, a) => <i className="icofont-ui-rating" key={a}></i>)}
      {maxRating - rate > 0 && new Array(maxRating - rate).fill().map((_, a) => <i className="icofont-ui-rate-blank" key={a}></i>)}
    </div>
  );
};

const Pagination = ({ pageCount, pageNumber, setPageNumber, ...props }) => {
  return (
    <div className="paginations">
      <ul>
        {new Array(pageCount).fill().map((_, i) => {
          return (
            <li key={i} className={classNames({ current: pageNumber == i + 1 })}>
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
    shows_categories: categories,
    shows_countries: countries,
    shows_generas: generas,
    shows_years: years
  }
}) => ({
  recentShows,
  categories,
  countries,
  generas,
  years,
  pageCount
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RecentShows);
