import React from "react";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import newsActions from "store/news/actions";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import ReCAPTCHA from "react-google-recaptcha";
import config from "config";
import { useRef } from "react";

const NewsView = ({ newsItem, location, fetchNewsItem, postNewsComment, commentsSuccess, clearCommentSuccess, ...props }) => {
  useEffect(() => {
    const id = location.pathname.split("/").pop();
    fetchNewsItem(id);
  }, []);

  return newsItem != undefined && !!newsItem.id ? (
    <section id="news_single">
      <div className="container">
        <div className="data_side">
          <div className="post_imgthumb">
            <img src={newsItem.posterUrl} />
          </div>
          <div className="post_details">
            <div className="share">
              <span>
                <Trans id="share">Share</Trans> :
              </span>
              <a href="#" title="#">
                <i className="icofont-facebook"></i>
              </a>
              <a href="#" title="#">
                <i className="icofont-twitter"></i>
              </a>
              <a href="#" title="#">
                <i className="icofont-instagram"></i>
              </a>
              <a href="#" title="#">
                <i className="icofont-youtube"></i>
              </a>
            </div>
            <time>
              <Trans id="posted">Posted</Trans>: {newsItem.date}
            </time>
          </div>
          <LanguageContext.Consumer>
            {({ locale }) => (
              <>
                <div className="title">{newsItem.title[locale.code]}</div>
                <div className="content">{newsItem.body[locale.code]}</div>
              </>
            )}
          </LanguageContext.Consumer>
          <div className="comments_area">
            <Comments comments={newsItem.comments} />
          </div>
          <CommentForm
            newsId={newsItem.id}
            postNewsComment={postNewsComment}
            commentsSuccess={commentsSuccess}
            clearCommentSuccess={clearCommentSuccess}
          />
        </div>
        <div className="side_bar">
          <AdsArea />
          <RelatedNews relatedNews={newsItem.relatedNews} />
        </div>
      </div>
    </section>
  ) : (
    <div>loading...</div>
  );
};

const CommentForm = ({ newsId, postNewsComment, commentsSuccess, clearCommentSuccess, ...props }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  // let reCaptchaRef = useRef();

  const onSubmit = values => {
    postNewsComment({
      ...values,
      id: newsId
    });
    setTimeout(() => {
      reset();
      setTimeout(() => {
        clearCommentSuccess();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="comment_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <input ref={register({ required: true })} name="name" type="text" placeholder="Name" />
          <input ref={register({ required: true })} name="title" type="text" placeholder="Comment Title" />
        </div>
        <textarea
          ref={register({ required: true })}
          name="comment"
          id=""
          cols="30"
          rows="10"
          placeholder="Type here your Comment"
        ></textarea>
        <ReCAPTCHA
          sitekey={config.reCaptchaKey}
          ref={() =>
            register(
              { name: "reCaptchaToken" },
              {
                validate: value => {
                  return !!value;
                }
              }
            )
          }
          onChange={v => {
            setValue("reCaptchaToken", v);
          }}
        />        
        <button type="submit">
          <Trans id="post_comment">Post Comment</Trans>
        </button>
        {"  "}
        {commentsSuccess === undefined ? null : commentsSuccess === true ? (
          <div class="msg_success">
            <Trans id="comment_submitted">Your comment has been submitted successfully for review</Trans>
          </div>
        ) : (
          <div class="msg_wrong">
            <Trans id="comment_failed">There is an error, the message could not be sent</Trans>
          </div>
        )}
      </form>
    </div>
  );
};

const Comments = ({ comments, ...props }) =>
  comments.map((c, i) => (
    <div key={c.id} className="item">
      <div className="user_info">
        <div className="imgthumb">
          <img src={`https://ui-avatars.com/api/?name=${c.userFullName}`} />
        </div>
        <div className="details">
          <span>{c.title}</span>
          <p>
            {c.date} <Trans id="by">by</Trans> <span>{c.userFullName}</span>
          </p>
        </div>
      </div>
      <div className="comment_content">{c.comment}</div>
    </div>
  ));

const AdsArea = props => (
  <>
    <div className="small_banner">
      <a href="#" title="#">
        <img src="/assets/images/small_banner.png" alt="#" />
      </a>
    </div>
    <div className="big_banner">
      <a href="#" title="#">
        <img src="/assets/images/big_banner.png" alt="#" />
      </a>
    </div>
  </>
);

const RelatedNews = ({ relatedNews, ...props }) => (
  <div className="related_news">
    <div className="title">
      <Trans id="related_news">Related News</Trans>
    </div>
    {relatedNews &&
      relatedNews.map(n => (
        <div key={n.id} className="item">
          <a href={`/news/${n.id}`}>
            <img src={n.posterUrl} />
          </a>
        </div>
      ))}
  </div>
);

const mapStateToProps = ({ news: { newsItem, postNewsComment, commentsSuccess }, router: { location } }) => ({
  newsItem,
  postNewsComment,
  commentsSuccess,
  location
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...newsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(NewsView);
