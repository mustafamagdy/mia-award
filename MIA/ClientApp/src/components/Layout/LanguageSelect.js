import React from "react";

import { LanguageContext } from "containers/Providers/LanguageProvider";

class LanguageSelect extends React.PureComponent {
  render() {
    return (
      <LanguageContext.Consumer>
        {({ supportedLocales, changeLocale, locale }) => {
          const otherLocale = Object.keys(supportedLocales).find(a => a != locale.code);
          const theOtherLocale = supportedLocales[otherLocale];
          return (
            <div className="language_switcher">
              <span
                onClick={() => {
                  changeLocale(theOtherLocale.code);
                }}
              >
                {theOtherLocale.short.toUpperCase()}
              </span>
            </div>
          );
        }}
      </LanguageContext.Consumer>
    );
  }
}

export default LanguageSelect;
