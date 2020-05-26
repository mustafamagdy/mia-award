import React from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";
import { Trans } from "@lingui/macro";

const MemberSidebar = ({ currentUser, ...props }) => {
  const { fullName, avatarImageUrl, address, jobTitle } = currentUser;
  return (
    <div className="member_sidebar">
      <div>
        <div className="imgthumb">
          <img src={avatarImageUrl} />
        </div>
        <div className="username">{fullName}</div>
        <ul>
          <li>
            <NavLink exact to="/members">
              <i className="icofont-home"></i>
              <Trans id="member_home">Member Home</Trans>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/members/profile">
              <i className="icofont-users-alt-3"></i>
              <Trans id="profile">Profile</Trans>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="logout" onClick={() => props.logout()}>
        <span>
          <i className="icofont-logout"></i>
          <Trans id="logout">Logout</Trans>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth: { currentUser } }) => ({ currentUser });
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...authActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MemberSidebar));
