import React, { useRef } from "react";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import ReCAPTCHA from "react-google-recaptcha";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import config from "config";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from "react-share";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import showsActions from "store/shows/actions";
import { bindActionCreators } from "redux";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import classNames from "classnames";
import { I18n } from "@lingui/react";

const ShowsView = ({
  show,
  location,
  fetchShowDetails,
  postShowReview,
  commentsSuccess,
  clearReviewSuccess,
  submittingComment,  
  ...props
}) => {
  useEffect(() => {
    const id = location.pathname.split("/").pop();
    fetchShowDetails(id);
  }, []);

  const tabs = ["info", "reviews"];
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = (tab) => {
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
                  <LanguageContext.Consumer>
                    {({ locale }) => (
                      <span>{show.projectName[locale.code]}</span>
                    )}
                  </LanguageContext.Consumer>
                </div>
              </div>
              <div className="desc">
                <div className="name">
                  <LanguageContext.Consumer>
                    {({ locale }) => show.projectName[locale.code]}
                  </LanguageContext.Consumer>
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
                      <Trans id="production_year"> Production Year </Trans>:
                    </span>
                    <p>{show.productionYear}</p>
                  </li>
                  <li>
                    <span>
                      <Trans id="broadcast_year"> Broadcast Year </Trans>:
                    </span>
                    <p>{show.broadcastYear}</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="about_show">
              <span>
                <Trans> About the show</Trans>
              </span>
              <p>
                <LanguageContext.Consumer>
                  {({ locale }) => show.description[locale.code]}
                </LanguageContext.Consumer>
              </p>
            </div>
          </div>
          <div className="show_video_show">
            <span>
              <LanguageContext.Consumer>
                {({ locale }) => (
                  <img
                    src={encodeURI(show.coverUrl)}
                    alt={show.projectName[locale.code]}
                  />
                )}
              </LanguageContext.Consumer>
            </span>
          </div>
        </div>
      </div>
      <div className="show_inner_two">
        <div className="container">
          <div className="show_video">
            <ReactPlayer
              controls
              url={show.trailerUrl}
              className="react-player"
              width="560"
              height="315"
              light={encodeURI(show.coverUrl)}
            />
          </div>
          <div className="show_content">
            <div className="tabs_area">
              <div className="tabs">
                <ul>
                  <TabList
                    activeClassName="active"
                    activeIndex={activeTab}
                    handleActiveTab={handleActiveTab}
                  >
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
                <div
                  className={classNames("item_tabs_content", {
                    active: activeTab == 0,
                  })}
                >
                  <Info show={show} />
                </div>
                <div
                  className={classNames("item_tabs_content", {
                    active: activeTab == 1,
                  })}
                >
                  <Reviews
                    show={show}
                    postShowReview={postShowReview}
                    commentsSuccess={commentsSuccess}
                    clearReviewSuccess={clearReviewSuccess}
                    submittingComment={submittingComment}
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
          <Trans id="siteUrl">Site Url </Trans>:
        </span>
        <span>{show.siteUrl}</span>
      </li>
      <li>
        <span>
          <Trans id="tvChannels">Tv Channels </Trans>:
        </span>
        <SplitNames names={show.tvChannels} />
      </li>
      <li>
        <span>
          <Trans id="onlineChannels">Online Channels </Trans>:
        </span>
        <SplitNames names={show.onlineChannels} />
      </li>
      <li>
        <span>
          <Trans id="productionLicenseNumber">Production license number </Trans>
          :
        </span>
        <span>{show.productionLicenseNumber}</span>
      </li>
      <li>
        <span>
          <Trans id="productionLicenseAgency">Production license agency </Trans>
          :
        </span>
        <span>{show.productionLicenseAgency}</span>
      </li>
    </ul>
  </div>
);

const Reviews = ({
  show,
  postShowReview,
  commentsSuccess,
  clearReviewSuccess,
  submittingComment,
  ...props
}) => (
  <div className="item_review">
    <div className="comments_area">
      <Comments comments={show.reviews} />
    </div>
    <CommentForm
      showId={show.id}
      postShowReview={postShowReview}
      commentsSuccess={commentsSuccess}
      clearReviewSuccess={clearReviewSuccess}
      submittingComment={submittingComment}
    />
  </div>
);

const CommentForm = ({
  showId,
  postShowReview,
  commentsSuccess,
  clearReviewSuccess,
  submittingComment,
  ...props
}) => {
  const { register, handleSubmit, reset, setValue, formState } = useForm();
  // let reCaptchaRef = useRef();
  const recaptchaRef = useRef();
  useEffect(() => {
    if (submittingComment) {
      reset({});
      recaptchaRef.current.reset();
    }
  }, [submittingComment]);

  const onSubmit = (values) => {
    postShowReview({
      ...values,
      id: showId,
    });
    setTimeout(() => {
      clearReviewSuccess();
    }, 2000);
  };

  return (
    <div className="comment_form">
      <I18n>
        {({ i18n }) => (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="inputs">
              <input
                ref={register({ required: true })}
                name="name"
                type="text"
                placeholder={i18n._("name")}
              />
              <input
                ref={register({ required: true })}
                name="email"
                type="email"
                placeholder={i18n._("your_email")}
              />
            </div>
            <div className="inputs">
              <input
                ref={register({ required: true })}
                name="title"
                type="text"
                placeholder={i18n._("comment_title")}
                style={{ flex: 1 }}
              />
            </div>
            <textarea
              ref={register({ required: true })}
              name="comment"
              id=""
              cols="30"
              rows="10"
              placeholder={i18n._("type_here_your_comment")}
            ></textarea>
            <ReCAPTCHA
              theme="dark"
              sitekey={config.reCaptchaKey}
              ref={(r) => {
                recaptchaRef.current = r;
                return register(
                  { name: "reCaptchaToken" },
                  {
                    validate: (value) => {
                      return !!value;
                    },
                  }
                );
              }}
              onChange={(v) => {
                setValue("reCaptchaToken", v);
              }}
            />
            <button type="submit" disabled={submittingComment}>
              <Trans id="post_comment">Post Comment</Trans>
            </button>
            {"  "}
            {commentsSuccess === undefined ? null : commentsSuccess === true ? (
              <div className="msg_success">
                <Trans id="comment_submitted">
                  Your comment has been submitted successfully for review
                </Trans>
              </div>
            ) : (
              <div className="msg_wrong">
                <Trans id="comment_failed">
                  There is an error, the message could not be sent
                </Trans>
              </div>
            )}
          </form>
        )}
      </I18n>
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

const AdsArea = (props) => (
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

const mapStateToProps = ({
  shows: { selectedShow, commentsSuccess, submittingComment },
  router: { location },
}) => ({
  show: selectedShow,
  commentsSuccess,
  location,
  submittingComment,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...showsActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ShowsView);
