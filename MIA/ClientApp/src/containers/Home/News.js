import React, { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const News = ({ fetchNews, news, news_pagination: { hasNextPage, hasPreviousPage }, ...props }) => {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchNews({ pageNumber: pageNumber, pageSize: 4 });
  }, [pageNumber]);

  return (
    <div id="news_features">
      <div className="container">
        <div className="title">
          <Trans id="news_features">news & features</Trans>
        </div>
        <div className="features_sliders">
          {news.map((item, index) => (
            <div className="feature_item" key={index}>
              <div className="feature_block">
                <time>{item.date}</time>
                <div className="item">
                  <div className="category">
                    <Trans id={item.category}>{item.category}</Trans>
                  </div>
                  <div className="imgthumb">
                    <img src={`${item.posterUrl}?w=293&h=550&mode=stretch`} />
                    <LanguageContext.Consumer>
                      {({ locale }) => (
                        <div className="mask">
                          <div className="content">
                            <p>{item.title[locale.code]}</p>
                            <div className="more">
                              <a href={`/news/${item.id}`}>
                                <Trans id="read_more">Read More</Trans>
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </LanguageContext.Consumer>
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
                setPageNumber(p => p - 1);
              }}
            >
              <Trans id="prev">prev</Trans>
            </button>
          ) : (
            <span />
          )}
          <a href="/news" title="#">
            <Trans id="show_all">show all</Trans>
          </a>
          {hasNextPage ? (
            <button
              type="button"
              className="arrow_next"
              onClick={() => {
                setPageNumber(p => p + 1);
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
