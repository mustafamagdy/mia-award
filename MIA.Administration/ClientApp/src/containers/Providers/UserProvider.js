import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import authActions from "store/auth/actions";
import accountActions from "store/accounts/actions";

export const UserContext = React.createContext();

class UserProvider extends React.PureComponent {
  dismissDlgs = event => {
    if (event.keyCode === 27) {
      this.props.closeSigninModal();
      this.props.closeCreateAccountModal();
      //todo: add any other dialogs you want to dismiss when Esc character is pressed
    }
  };

  switchToCreateAccount = () => this.setState({ createAccountModalOpened: true, signinModalOpened: false });
  switchToSignIn = () => this.setState({ createAccountModalOpened: false, signinModalOpened: true });

  componentDidMount() {
    document.addEventListener("keydown", this.dismissDlgs, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.dismissDlgs, false);
  }

  render() {
    const { switchToCreateAccount, switchToSignIn } = this;
    const { children, auth, account, ...rest } = this.props;

    return (
      <UserContext.Provider
        value={{
          switchToCreateAccount,
          switchToSignIn,
          ...auth,
          ...account,
          ...rest
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

const mapStateToProps = ({ auth, account }) => ({ auth, account });
const mapDispatchToProps = dispatch => bindActionCreators({ ...authActions, ...accountActions }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProvider);
