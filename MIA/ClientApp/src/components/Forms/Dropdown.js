import React from "react";
import { PropTypes } from "prop-types";

class Dropdown extends React.PureComponent {
  state = { dropdownOpen: false, selectedOption: undefined };
  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  render() {
    const { dropdownOpen } = this.state;
    return (
      <div className="contacts-select">
        <div
          className={`select-drop ${dropdownOpen ? "open" : ""}`}
          onClick={this.toggleDropdown}
        >
          <span className="select-drop__text">
            {this.state.selectedOption
              ? this.state.selectedOption.label
              : "Select an option"}
          </span>
          <div className="select-drop__results">
            {this.props.options &&
              this.props.options.map(option => (
                <span
                  key={option.value}
                  onClick={() => this.setState({ selectedOption: option })}
                  className="select-drop__results-item"
                >
                  {option.label}
                </span>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Dropdown;
