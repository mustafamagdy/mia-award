import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import globalActions from "store/app/actions";

class Home extends React.Component {
  componentDidMount() {
    if (window.location.href == "/") {
      debugger
      this.props.clearIsLoading();
    }
  }

  render() {
    return (
      <div className="section catalog">
        <div className="catalog-top">
          <div className="catalog-top__wrap">
            <div className="container catalog-top__info">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({ ...globalActions }, dispatch);
export default connect(null, mapDispatchToProps)(Home);
