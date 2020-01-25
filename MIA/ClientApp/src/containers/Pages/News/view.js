import React from "react";
import { Trans } from "@lingui/macro";
import { useForm } from "react-hook-form";
import { useState } from "react";

const NewsView = props => {
  const comments = [
    {
      id: "1",
      userAvatarUrl: "/assets/images/comment_user_image.png",
      userFullName: "Ahmed Adel",
      date: "25 March 2020",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
    ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "2",
      userAvatarUrl: "/assets/images/comment_user_image.png",
      userFullName: "Ahmed Adel",
      date: "25 March 2020",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
    ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "3",
      userAvatarUrl: "/assets/images/comment_user_image.png",
      userFullName: "Ahmed Adel",
      date: "25 March 2020",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
    ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "4",
      userAvatarUrl: "/assets/images/comment_user_image.png",
      userFullName: "Ahmed Adel",
      date: "25 March 2020",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
    ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    },
    {
      id: "5",
      userAvatarUrl: "/assets/images/comment_user_image.png",
      userFullName: "Ahmed Adel",
      date: "25 March 2020",
      comment: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit
    amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse
    ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`
    }
  ];

  const newsItem = {
    id: "1",
    thumbImgUrl: "/assets/images/news_single_image.png",
    date: "12-05-2020",
    title: "The Blue Elephant (News Title)",
    body: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
publishing software like Aldus PageMaker including versions of Lorem Ipsum Lorem Ipsum passages, and more recently with desktop
publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
    comments: comments
  };

  return (
    <section id="news_single">
      <div className="container">
        <div className="data_side">
          <div className="post_imgthumb">
            <img src={newsItem.thumbImgUrl} />
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
          <div className="title">{newsItem.title}</div>
          <div className="content">{newsItem.body}</div>
          <div className="comments_area">
            <Comments comments={newsItem.comments} />
          </div>
          <CommentForm />
        </div>
        <div className="side_bar">
          <AdsArea />
          <RelatedNews />
        </div>
      </div>
    </section>
  );
};

const CommentForm = props => {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState(undefined);
  const [status, setStatus] = useState(false);

  const onSubmit = values => {
    setTimeout(() => {
      console.log("comment ", values);
      setStatus(true);
      setMessage("Your comment has been submitted successfully for review");
      reset();
      setTimeout(() => {
        setMessage(undefined);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="comment_form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputs">
          <input ref={register} name="name" type="text" placeholder="Name" />
          <input ref={register} name="title" type="text" placeholder="Comment Title" />
        </div>
        <textarea ref={register} name="comment" id="" cols="30" rows="10" placeholder="Type here your Comment"></textarea>
        <button type="submit">
          <Trans id="post_comment">Post Comment</Trans>
        </button>
        {"  "}
        {message == undefined ? null : <span className={!!status ? "success" : "danger"}>{message}</span>}
      </form>
    </div>
  );
};

const Comments = ({ comments, ...props }) =>
  comments.map((c, i) => (
    <div key={c.id} className="item">
      <div className="user_info">
        <div className="imgthumb">
          <img src={c.userAvatarUrl} />
        </div>
        <div className="details">
          <span>{c.title}</span>
          <p>
            {c.date}
            <Trans id="by">by</Trans> <span>{c.userFullName}</span>
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

const RelatedNews = props => (
  <div className="related_news">
    <div className="title">Related News</div>
    <div className="item">
      <a href="#" title="#">
        <img src="/assets/images/related_news_image.png" alt="#" />
      </a>
    </div>
    <div className="item">
      <a href="#" title="#">
        <img src="/assets/images/related_news_image.png" alt="#" />
      </a>
    </div>
    <div className="item">
      <a href="#" title="#">
        <img src="/assets/images/related_news_image.png" alt="#" />
      </a>
    </div>
  </div>
);

export default NewsView;
