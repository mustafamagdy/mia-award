import React from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import ReCAPTCHA from "react-google-recaptcha";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import config from "config";
import { FacebookShareButton, TwitterShareButton, InstapaperShareButton, WhatsappShareButton } from "react-share";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import showsActions from "store/shows/actions";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";

const ShowsView = ({ show, location, fetchShowDetails, postShowReview, commentsSuccess, clearReviewSuccess, ...props }) => {
  useEffect(() => {
    const id = location.pathname.split("/").pop();
    fetchShowDetails(id);
  }, []);

  const tabs = ["info", "reviews"];
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = tab => {
    setActiveTab(tab);
  };
  return show != undefined && !!show.id ? (
    <section id="show_inner">
      <div className="show_inner_one">
        <div className="container">
          <div className="show_info">
            <div className="show_details">
              <div className="imgthumb">
                <img src={show.posterUrl} />
                <div className="mask">
                  <LanguageContext.Consumer>{({ locale }) => <span>{show.title[locale.code]}</span>}</LanguageContext.Consumer>
                </div>
              </div>
              <div className="desc">
                <div className="name">
                  <LanguageContext.Consumer>{({ locale }) => show.title[locale.code]}</LanguageContext.Consumer>
                </div>
                {/* <div className="stars">
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rate-blank"></i>
                <i className="icofont-ui-rate-blank"></i>
              </div> */}
                <ul>
                  <li>
                    <span>
                      <Trans id="date_of_release"> Date of release </Trans>:
                    </span>
                    <p>{show.year}</p>
                  </li>
                  <li>
                    <span>
                      <Trans id="category"> Category </Trans>:
                    </span>
                    <p>{show.category}</p>
                  </li>
                  <li>
                    <span>
                      <Trans id="genre">Genre</Trans>:
                    </span>
                    <p>{show.genre}</p>
                  </li>
                  <li>
                    <span>
                      <Trans id="country">Country</Trans>:
                    </span>
                    <p>{show.country}</p>
                  </li>
                  <li>
                    <span>
                      <Trans id="posted_date">Posted</Trans>:
                    </span>
                    <p>{show.postedDate}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="about_show">
              <span>
                <Trans> About the show</Trans>
              </span>
              <p>
                <LanguageContext.Consumer>{({ locale }) => show.showDescription[locale.code]}</LanguageContext.Consumer>
              </p>
            </div>
          </div>
          <div className="show_video_show">
            <span>
              <img src={show.coverUrl} />
            </span>
          </div>
        </div>
      </div>
      <div className="show_inner_two">
        <div className="container">
          <div className="show_video">
            <ReactPlayer controls url={show.trailerUrl} className="react-player" width="560" height="315" light={show.coverUrl} />
          </div>
          <div className="show_content">
            <div className="tabs_area">
              <div className="tabs">
                <ul>
                  <TabList activeClassName="active" activeIndex={activeTab} handleActiveTab={handleActiveTab}>
                    {tabs.map((t, i) => (
                      <Tab key={i}>
                        <li>
                          <Trans id={t}>{t}</Trans>
                        </li>
                      </Tab>
                    ))}
                  </TabList>
                </ul>
              </div>
              <div className="all_tabs_content">
                <div className={classNames("item_tabs_content", { active: activeTab == 0 })}>
                  <Info show={show} />
                </div>
                <div className={classNames("item_tabs_content", { active: activeTab == 1 })}>
                  <Reviews
                    show={show}
                    postShowReview={postShowReview}
                    commentsSuccess={commentsSuccess}
                    clearReviewSuccess={clearReviewSuccess}
                  />
                </div>
              </div>
            </div>
            <div className="side_bar">
              <AdsArea />
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div>loading...</div>
  );
};

const SplitNames = ({ names }) => {
  const _names = (names || "").split(",");
  // if (Sep != undefined)
  //   return _names.map((n, i) => (
  //     <React.Fragment key={i}>
  //       {n} <Sep />
  //     </React.Fragment>
  //   ));
  // else
  return _names.map((n, i) => <p key={i}>{n}</p>);
};
const Info = ({ show, ...props }) => (
  <div className="info_show">
    <ul>
      <li>
        <span>
          <Trans id="director">Director </Trans>:
        </span>
        <SplitNames names={show.director} />
      </li>
      <li>
        <span>
          <Trans id="production">Production </Trans>:
        </span>
        <SplitNames names={show.production} />
      </li>
      <li>
        <span>
          <Trans id="writers">Writers </Trans>:
        </span>
        <SplitNames names={show.writer} />
      </li>
      <li>
        <span>
          <Trans id="story">Story </Trans>:
        </span>
        <SplitNames names={show.story} />
      </li>
      <li>
        <span>
          <Trans id="stars">Stars </Trans>:
        </span>
        <SplitNames names={show.stars} />
      </li>
      <li>
        <span>
          <Trans id="crew">Crew </Trans>:
        </span>
        <div className="crew_content">
          <div className="title">
            <Trans id="cast">Cast</Trans>
          </div>
          <div className="content">
            <SplitNames names={show.cast} />
          </div>
          <div className="title">
            <Trans id="pod">D.O.P</Trans>
          </div>
          <div className="content">
            <SplitNames names={show.pod} />
          </div>
        </div>
      </li>
    </ul>
  </div>
);

const Reviews = ({ show, postShowReview, commentsSuccess, clearReviewSuccess, ...props }) => (
  <div className="item_review">
    <div className="comments_area">
      <Comments comments={show.reviews} />
    </div>
    <CommentForm
      showId={show.id}
      postShowReview={postShowReview}
      commentsSuccess={commentsSuccess}
      clearReviewSuccess={clearReviewSuccess}
    />
  </div>
);

const CommentForm = ({ showId, postShowReview, commentsSuccess, clearReviewSuccess, ...props }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  // let reCaptchaRef = useRef();

  const onSubmit = values => {
    postShowReview({
      ...values,
      id: showId
    });
    setTimeout(() => {
      reset();
      setTimeout(() => {
        clearReviewSuccess();
      }, 2000);
    }, 1000);
  };

  return (
    <div className="comment_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <input ref={register({ required: true })} name="name" type="text" placeholder="Name" />
          <input ref={register({ required: true })} name="email" type="email" placeholder="Your Email" />
        </div>
        <div className="inputs">
          <input ref={register({ required: true })} name="title" type="text" placeholder="Comment Title" style={{ flex: 1 }} />
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
          theme="dark"
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
          <div className="msg_success">
            <Trans id="comment_submitted">Your comment has been submitted successfully for review</Trans>
          </div>
        ) : (
          <div className="msg_wrong">
            <Trans id="comment_failed">There is an error, the message could not be sent</Trans>
          </div>
        )}
      </form>
    </div>
  );
};
const Comments = ({ comments, ...props }) =>
  comments != undefined && comments.length > 0 ? (
    comments.map((c, i) => (
      <div className="item">
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
    ))
  ) : (
    <h2>
      <Trans id="no_reviews_yet">No reviews yet</Trans>
    </h2>
  );

const AdsArea = props => (
  <>
    <div className="small_banner">
      <a href="#" title="#">
        <img src="/assets/images/small_banner.png" />
      </a>
    </div>
    <div className="big_banner">
      <a href="#" title="#">
        <img src="/assets/images/big_banner.png" />
      </a>
    </div>
  </>
);

const mapStateToProps = ({ shows: { selectedShow, commentsSuccess }, router: { location } }) => ({
  show: selectedShow,
  commentsSuccess,
  location
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...showsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowsView);
