import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";

import Artworks from "./Artworks";
import Artwork from "./Artworks/Artwork";
import MemberSidebar from "./MemberSidebar";
import Profile from "./Profile";

const MembersArea = ({
  location,
  match,
  currentUser,
  isLoggedIn,
  logout,
  ...props
}) => {
  return isLoggedIn && currentUser ? (
    <section id="member_area">
      <div className="container">
        <MemberSidebar logout={logout} />
        <div className="member_wrapper">
          <Switch>
            <Route exact path="/members/profile" component={Profile} />
            <Route path="/members/artwork" component={Artwork} />
            <Route exact path="/members" component={Artworks} />
            <Redirect from="*" to="/members" />
          </Switch>
        </div>
      </div>
    </section>
  ) : (
    <Redirect {...props} to="/members/signin" />
  );
};

const mapStateToProps = ({ auth: { currentUser, isLoggedIn } }) => ({
  currentUser,
  isLoggedIn,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...membersActions, ...authActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MembersArea));
