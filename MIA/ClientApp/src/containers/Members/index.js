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

const MemberArea = ({ location, match, currentUser, isLoggedIn,logout, ...props }) => {
  if (location.pathname === "/members") {
    if (!isLoggedIn || !currentUser) {
      return <Redirect to={"/members/signin"} />;
    } else {
      return (
        <section id="member_area">
          <div className="container">
            <MemberSidebar logout={logout} />
            <div className="member_wrapper">
              <Switch>
                <Route exact path="/members" component={Artworks} />
                <Route exact path="/members/profile" component={Profile} />
                <Route path="/members/artwork" component={Artwork} />
              </Switch>
            </div>
          </div>
        </section>
      );
    }
  } else if (location.pathname === "/members/signin") {
    return <Auth />;
  }
};

const mapStateToProps = ({ auth: { currentUser, isLoggedIn } }) => ({ currentUser, isLoggedIn });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions,...authActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberArea));
