import React from "react";
import { Trans } from '@lingui/macro';
import { UserContext } from "containers/Providers/UserProvider";
import { Link } from "react-router-dom";
const HeaderUserAvatar = ({ logout, user, profile: { firstName, lastName, avatarImageUrl }, ...props }) => {
  return (
    <React.Fragment>
      <div className="hd-login hd-login--logged">
        <Link to="/account" className="hd-login__sign-in hd-sign-in-link">
          <img alt="" src={`${avatarImageUrl}?w=31&h=31&mode=stretch`} className="hd-login__img" />
          { `${firstName} ${lastName}` }
        </Link>
        <span className="hd-login__sign-up hd-sign-up" onClick={() => logout()}>
          <Trans id="logout"> Logout </Trans>
        </span>
      </div>
    </React.Fragment>
  );
};

const LoginStatus = ({ ...props }) => {
  return (
    <UserContext.Consumer>
      {({ openSigninModal, openCreateAccountModal, currentUser, isLoggedIn, logout, profile }) => (
        <React.Fragment>
          {isLoggedIn ? (
            <HeaderUserAvatar user={currentUser} logout={logout} profile={profile} />
          ) : (
            <React.Fragment>
              <span className="hd-login__sign-in hd-sign-in" onClick={openSigninModal}>
              <Trans id="sign_in"> sign in </Trans>
              </span>
              <span className="hd-login__sign-up hd-sign-up" onClick={openCreateAccountModal}>
                <Trans id="create_account">Create account</Trans>
              </span>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
};

export default LoginStatus;
