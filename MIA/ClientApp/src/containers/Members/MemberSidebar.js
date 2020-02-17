import React from "react";

const MemberSidebar = props => (
   <div className="member_sidebar">
    <div>
      <div className="imgthumb">
        <img src="/assets/images/related_news_image.png" alt="#" />
      </div>
      <div className="username">Ahmed Hassan Ahmed</div>
      <ul>
        <li className="active">
          <a href="/members">
            <i className="icofont-home"></i> Member Home
          </a>
        </li>
        <li>
          <a href="/members/profile">
            <i className="icofont-users-alt-3"></i> Profile
          </a>
        </li>
        <li>
          <a href="/members/shows">
            <i className="icofont-video-clapper"></i> Shows <span>9</span>
          </a>
        </li>
        <li>
          <a href="/members/payments">
            <i className="icofont-pay"></i> Payments
          </a>
        </li>
      </ul>
    </div>
    <div className="logout" onClick={() => props.logout()}>
      <span>
        <i className="icofont-logout" ></i>Logout
      </span>
    </div>
  </div>
)

export default MemberSidebar;
