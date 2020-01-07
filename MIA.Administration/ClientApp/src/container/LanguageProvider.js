import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { I18nProvider } from "@lingui/react";
import { bindActionCreators } from "redux";

import SupportedLocales from "Store/SupportedLocales";
import appActions from "Store/app/actions";
import { DEFAULT_LOCALE } from "../constants";

export const LanguageContext = React.createContext();

class LanguageProvider extends React.Component {
  state = {
    catalogs: {}
  };

  loadLanguage = async locale => {
    /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
    const catalogs = await import(`@lingui/loader!../locales/${locale || "en"}/messages.po`);

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [locale]: catalogs.default //es module
      }
    }));
  };

  componentDidMount() {
    const {
      locale: { code: localeCode }
    } = this.props;

    //load all default locales by default (usually en, and ar only)
    const defaultLocales = ["ar", "en"];
    Promise.all([this.loadLanguage(defaultLocales[0]), this.loadLanguage(defaultLocales[1])]);

    //if the required locale is not loaded already, load it
    if (!defaultLocales.includes(localeCode)) {
      this.loadLanguage(localeCode);
    }
  }

  shouldComponentUpdate(nextProps) {
    const catalogs = this.state;
    const {
      locale: { code: localeCode }
    } = this.props;

    if (localeCode !== nextProps.locale.code && !catalogs[nextProps.locale.code]) {
      this.loadLanguage(nextProps.locale.code);
      return false;
    }

    return true;
  }
  render = () => {
    const { locale, children, changeLocale } = this.props;
    const { catalogs } = this.state;
    const { code: localeCode } = locale;
    if (!catalogs[localeCode]) return null;

    const suggestedLanguage = SupportedLocales[DEFAULT_LOCALE];

    return (
      <LanguageContext.Provider value={{ locale, supportedLocales: SupportedLocales, changeLocale, suggestedLanguage }}>
        <I18nProvider language={localeCode} catalogs={catalogs}>
          {React.Children.only(children)}
        </I18nProvider>
      </LanguageContext.Provider>
    );
  };
}

LanguageProvider.propTypes = {
  locale: PropTypes.shape({ code: PropTypes.string.isRequired }).isRequired,
  children: PropTypes.element.isRequired
};

const mapStateToProps = ({ global: { locale } }) => ({ locale });
const mapDispatchToProps = dispatch => bindActionCreators({ ...appActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LanguageProvider);
