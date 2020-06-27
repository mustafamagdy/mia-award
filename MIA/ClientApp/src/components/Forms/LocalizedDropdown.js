import React from "react";
import { PropTypes } from "prop-types";
import { I18n } from "@lingui/react";

class LocalizedDropdown extends React.PureComponent {
  render() {
    const {
      field: { name },
      form: { setFieldValue },
      labelProp = "label",
      valueProp = "id",
      options,
      selectCb,
      emptyValue,
    } = this.props;
    if (emptyValue && options.some((a) => a[valueProp] == "0") == false) {
      options.unshift({
        [valueProp]: "0",
        [labelProp]: emptyValue,
      });
    }

    return (
      <select
        name={name}
        onChange={(a) => {
          const _item = options.find((x) => x[valueProp] == a.target.value);
          selectCb && selectCb(_item);
          if (_item[valueProp] == "0") {
            setFieldValue(name, undefined);
          } else {
            setFieldValue(name, _item[valueProp]);
          }
        }}
      >
        <I18n>
          {({ i18n }) => {
            return options.map((a, i) => (
              <option key={a[valueProp]} value={a[valueProp]}>
                {a[labelProp][i18n.language] || a[labelProp]}
              </option>
            ));
          }}
        </I18n>
      </select>
    );
  }
}

LocalizedDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default LocalizedDropdown;
