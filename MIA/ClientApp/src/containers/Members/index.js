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
import Auth from "./Auth";
import { Code } from "bson";

const MemberArea = ({ location, match, currentUser, isLoggedIn, logout, ...props }) => {

  if (location.pathname === "/members/resetPassword") {

    return <Auth reset={true} />;
  }
  if (location.pathname === "/members/signin") {
    return <Auth />;
  }
  else {
    if (!isLoggedIn || !currentUser) {
      return <Redirect to={"/members/signin"} />;
    } else {
      return (
        <section id="member_area">
          <div className="container">
            <MemberSidebar logout={logout} />
            <div className="member_wrapper">
              <Switch>
                <Route exact path="/members/profile" component={Profile} />
                <Route path="/members/artwork" component={Artwork} />
                <Route exact path="/members" component={Artworks} />
              </Switch>
            </div>
          </div>
        </section>
      );
    }
  }
};

const mapStateToProps = ({ auth: { currentUser, isLoggedIn } }) => ({ currentUser, isLoggedIn });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions, ...authActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberArea));
