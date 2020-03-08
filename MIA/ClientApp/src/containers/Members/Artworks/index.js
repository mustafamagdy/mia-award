import React from "react";
import { Route, withRouter, Switch, Redirect } from "react-router";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import authActions from "store/auth/actions";
import { bindActionCreators } from "redux";
import { LanguageContext } from "containers/Providers/LanguageProvider";

const Award = ({ award, ...props }) => {

  return (
    <div className="award_col">
      <div className="award_block">
        <div className="show_one">
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <LanguageContext.Consumer>
            {({ locale }) => (
              <>
                <div
                  className="name"
                  dangerouslySetInnerHTML={{
                    __html: award.title[locale.code]
                  }}
                ></div>
                <div
                  className="desc"
                  dangerouslySetInnerHTML={{
                    __html: award.description[locale.code]
                  }}
                ></div>
              </>
            )}
          </LanguageContext.Consumer>
        </div>
        <div className="show_two">
          <div className="imgthumb">
            <img src={award.trophyUrl} />
          </div>
          <div className="apply">
            <a href="#" title="#">
              apply now
          </a>
          </div>
          <div className="name">{award.code}</div>
        </div>
      </div>
    </div>
  );
}

const ArtWork = ({ artWork, ...props }) => {

  return (
    <div className="item" >
      <div className="imgthumb">
        <a href={`/members/artwork/${artWork.id}`} title="#">
          <img src={artWork?.coverUrl} />
          <div className="mask">
            <div className="content">
              <LanguageContext.Consumer>
                {({ locale }) => (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: artWork.title[locale.code]
                      }}
                    ></p>
                  </>
                )}
              </LanguageContext.Consumer>
              {/* <div className="stars">
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rate-blank"></i>
                <i className="icofont-ui-rate-blank"></i>
              </div> */}
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

const Artworks = ({ fetchMyArtworks, fetchMyAwards, myAwards, myArtworks, myAwardsLoaded, myArtworksLoaded, ...props }) => {
  if (!myAwardsLoaded)
    fetchMyAwards();
  if (!myArtworksLoaded)
    fetchMyArtworks();
  return (
    <React.Fragment>
      <div className="upload_poster"></div>
      <div className="awards_area">
        <div className="title">Awards</div>
        <div className="all_awards_area">
          {myAwards && myAwards.map((m, i) => {
            return <Award key={i} award={m} />;
          })}
          {myAwards.length === 0 && (<div>No awards yet</div>)}

        </div>
      </div>
      <div className="show_area">
        <div className="title">Shows</div>
        <div className="all_shows_area">
          {myArtworks && myArtworks.map((m, i) => {
            return <ArtWork  artWork={m} key={i} />;
          })}
          <div className="item add_new">
            <div className="upload_area">
              <a href="/members/artwork">
                <i className="icofont-plus"></i>
                <span>add new show</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
// export default Artworks;

// const mapStateToProps = ({ auth: { currentUser, isLoggedIn } }) => ({ currentUser, isLoggedIn });
const mapStateToProps = ({ members: { myAwards, myArtworks, myAwardsLoaded, myArtworksLoaded } }) => ({ myAwards, myArtworks, myAwardsLoaded, myArtworksLoaded });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions, ...authActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Artworks));
