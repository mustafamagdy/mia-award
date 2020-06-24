import React from "react";
import { PropTypes } from "prop-types";
import { I18n } from "@lingui/react";

class LocalizedDropdown extends React.PureComponent {
  state = { dropdownOpen: false, selectedOption: undefined };
  toggleDropdown = () =>
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  render() {
    const { dropdownOpen } = this.state;
    const { labelProp = "label" } = this.props;
    return (
      <I18n>
        {({ i18n }) => (
          <div className="contacts-select">
            <div
              className={`select-drop ${dropdownOpen ? "open" : ""}`}
              onClick={this.toggleDropdown}
            >
              <span className="select-drop__text">
                {this.state.selectedOption
                  ? this.state.selectedOption.label
                  : i18n._("select_an_option")}
              </span>
              <div className="select-drop__results">
                {this.props.options &&
                  this.props.options.map((option) => (
                    <span
                      key={option.value}
                      onClick={() => this.setState({ selectedOption: option })}
                      className="select-drop__results-item"
                    >
                      {option[labelProp][i18n.language]}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        )}
      </I18n>
    );
  }
}

LocalizedDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LocalizedDropdown;
