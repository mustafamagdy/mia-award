import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";

import Artworks from "./Artworks";
import Artwork from "./Artworks/Artwork";
import MemberSidebar from "./MemberSidebar";
import Profile from "./Profile";
import Auth from "./Auth";

const MemberArea = ({ location, match, currentUser, isLoggedIn, ...props }) => {
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
            <MemberSidebar />
            <div className="member_wrapper">
              <Switch>
                <Route exact path="/members/profile" component={Profile} />
                <Route path="/members/artwork" component={Artwork} />
                <Route path="/members" component={Artworks} />
              </Switch>
            </div>
          </div>
        </section>
      );
    }
  } 
};

const mapStateToProps = ({ auth: { currentUser, isLoggedIn } }) => ({ currentUser, isLoggedIn });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MemberArea));
