import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";

// import "sass/news.scss";

const initState = {
  pageNumber: 1,
  pageSize: 4
};

const News = ({ fetchNews, news, news_pagination: { hasNextPage, hasPreviousPage }, ...props }) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    fetchNews({ pageNumber: state.pageNumber, pageSize: state.pageSize });
  }, [state.pageNumber, state.pageSize]);

  return (
    <div id="news_features">
      <div className="container">
        <div className="title">news & features</div>
        <div className="features_sliders">
          {news.map((item, index) => (
            <div className="feature_item" key={index}>
              <div className="feature_block">
                <time>{item.date}</time>
                <div className="item">
                  <div className="category">
                    <p>
                      <Trans id={item.category}>{item.category}</Trans>
                    </p>
                  </div>
                  <div className="imgthumb">
                    <img src={`${item.posterUrl}?w=293&h=550&mode=stretch`} alt="#" />
                    <div className="mask">
                      <div className="content">
                        <p>{item.title}</p>
                        <div className="more">
                          <a href="#" title="#">
                            <Trans id="read_more">read more</Trans>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="features_nav">
          {hasPreviousPage ? (
            <button
              type="button"
              className="arrow_prev"
              onClick={() => {
                setState({ ...state, pageNumber: state.pageNumber - 1 });
              }}
            >
              <Trans id="prev">prev</Trans>
            </button>
          ) : (
            <span />
          )}
          <a href="#" title="#">
            <Trans id="show_all">show all</Trans>
          </a>
          {hasNextPage ? (
            <button
              type="button"
              className="arrow_next"
              onClick={() => {
                setState({ ...state, pageNumber: state.pageNumber + 1 });
              }}
            >
              <Trans id="next">next</Trans>
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { news, news_pagination } }) => ({ news, news_pagination });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(News);
