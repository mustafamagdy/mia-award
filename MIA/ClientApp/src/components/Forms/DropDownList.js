import React, { Component } from "react";
import PropTypes from "prop-types";
import withClickOutside from "react-click-outside";

class DropdownList extends Component {
  state = {
    dropdownOpen: false,
    selectedOption: undefined
  };

  componentDidMount() {
    this.setState({ selectedOption: this.props.initialValue, dropdownOpen: this.props.isOpenOnMount });
  }

  handleClickOutside = () => this.setState({ dropdownOpen: false });

  toggleDropdown = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  toggleOpen = e => {
    this.setState({ dropdownOpen: true });
  };

  setSelected = e => {
    this.setState({ selectedOption: e.target.textContent })
  };

  render() {
    return <React.Fragment>{this.props.render(this.state, this.toggleDropdown, this.setSelected, this.toggleOpen)}</React.Fragment>;
  }
}

DropdownList.propTypes = {
  initialValue: PropTypes.string,
  isOpenOnMount: PropTypes.bool,
  render: PropTypes.func
};

export default withClickOutside(DropdownList);
