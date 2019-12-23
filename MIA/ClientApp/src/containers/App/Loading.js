import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { connect } from "react-redux";

const portalRoot = document.getElementById("portal");
class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.portal = document.createElement("div");
  }

  componentDidMount() {
    portalRoot.appendChild(this.portal);
  }

  render() {
    this.portal.className = classnames("preloader", { "preloader--visible": this.props.isLoadingHotels });
    return ReactDOM.createPortal(<div className="preloader-back"></div>, this.portal);
  }
}

const mapStateToProps = ({ global: { isLoadingHotels } }) => ({ isLoadingHotels });
export default connect(
  mapStateToProps,
  null
)(LoadingScreen);
