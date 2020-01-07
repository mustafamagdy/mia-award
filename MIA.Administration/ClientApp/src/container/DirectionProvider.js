import React, { Component } from "react";
import { connect } from "react-redux";
import DirectionProvider from "react-with-direction/dist/DirectionProvider";

class LayoutDirectionProvider extends Component {
  render() {
    return (
      <DirectionProvider direction={this.props.direction}>
        {this.props.children}
      </DirectionProvider>
    );
  }
}

const mapStateToProps = ({ global: { direction } }) => ({ direction });
export default connect(
  mapStateToProps,
  null
)(LayoutDirectionProvider);
