import React from "react";
import { Trans } from "@lingui/react";
import withClickOutside from "react-click-outside";
import keys from "ramda/es/keys";
import map from "ramda/es/map";

import { LanguageContext } from "containers/Providers/LanguageProvider";

const LanguageRow = ({ code, name, flag, onSelect, selected, ...props }) => (
  <li className={`hd-drop__list-item ${selected ? "selected" : ""}`} onClick={onSelect}>
    <a href="#" className="hd-drop__list-link ">
      <span className={`flag flag-${flag}`} />
      <span>{name}</span>
    </a>
  </li>
);
class LanguageSelect extends React.PureComponent {
  state = {
    dropdownOpen: false
  };
  toggleDropdown = () => this.setState({ dropdownOpen: !this.state.dropdownOpen });
  handleClickOutside = () => this.setState({ dropdownOpen: false });

  render() {
    const {
      state: { dropdownOpen },
      toggleDropdown
    } = this;

    return (
      <LanguageContext.Consumer>
        {({ supportedLocales, changeLocale, suggestedLanguage, locale }) => {
          const otherLocales = [];

          map(code => {
            const l = supportedLocales[code];
            if (l.code !== suggestedLanguage.code) otherLocales.push(l);
          }, keys(supportedLocales));

          return (
            <div className={`hd-langs ${dropdownOpen ? "open" : ""}`} onClick={toggleDropdown}>
              <span className={`hd-langs__icon flag flag-${supportedLocales[locale.code].flag}`} />
              <span className="hd-langs__text">
                <Trans id="language">Language</Trans>
              </span>
              <div className="hd-dropdown hd-dropdown--langs">
                <div className="langs hd-drop">
                  <div className="hd-drop__group">
                    <div className="hd-drop__title hd-drop__title--bg">
                      <Trans id="suggested_languages">Suggested languages</Trans>
                    </div>
                    <ul className="hd-drop__list">
                      {
                        <LanguageRow
                          key={suggestedLanguage.code}
                          {...suggestedLanguage}
                          selected={locale.code === suggestedLanguage.code}
                          onSelect={() => changeLocale(suggestedLanguage.code)}
                        />
                      }
                    </ul>
                  </div>
                  <div className="hd-drop__group langs-all">
                    <div className="hd-drop__title hd-drop__title--bg">
                      <Trans id="all_languages">All languages</Trans>
                    </div>
                    <ul className="hd-drop__list">
                      {otherLocales.map(l => (
                        <LanguageRow key={l.code} {...l} selected={locale.code === l.code} onSelect={() => changeLocale(l.code)} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

export default withClickOutside(LanguageSelect);
