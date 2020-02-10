import React from "react";
import { Route } from "react-router";
import Artworks from "./Artworks";
import Artwork from "./Artworks/Artwork";
import MemberSidebar from "./MemberSidebar";
import Profile from "./Profile";

const MemberArea = props => (
  <section id="member_area">
    <div className="container">
      <MemberSidebar />
      <div className="member_wrapper">
        <Route exact path="/members" component={Artworks} />
        <Route exact path="/members/profile" component={Profile} />
        <Route path="/members/artwork" component={Artwork} />
      </div>
    </div>
  </section>
);

export default MemberArea;
