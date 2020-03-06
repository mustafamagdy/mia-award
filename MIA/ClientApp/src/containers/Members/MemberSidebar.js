import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";

const MemberSidebar = ({ currentUser, ...props }) => {
  const { fullName, address, jobTitle } = currentUser;
  return (
    <div className="member_sidebar">
      <div>
        <div className="imgthumb">
          <img src="/assets/images/related_news_image.png" />
        </div>
        <div className="username">{fullName}</div>
        <ul>
          <li>
            <NavLink exact to="/members">
              <i className="icofont-home"></i> Member Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/members/profile">
              <i className="icofont-users-alt-3"></i> Profile
            </NavLink>
          </li>
          {/* <li>
          <a href="/members/shows">
            <i className="icofont-video-clapper"></i> Shows <span>9</span>
          </a>
        </li>
        <li>
          <a href="/members/payments">
            <i className="icofont-pay"></i> Payments
          </a>
        </li> */}
        </ul>
      </div>
      <div className="logout" onClick={() => props.logout()}>
        <span>
          <i className="icofont-logout"></i>Logout
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({ currentUser });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberSidebar));
