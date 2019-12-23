import React from "react";
import { Trans, I18n } from '@lingui/macro';
import { t } from "@lingui/macro";

class AboutUs extends React.PureComponent {
  render() {
    return (
      <div className="about">
        <div className="about-top">
          <div className="about-top__wrap">
            <div className="container about-top__info" />
          </div>
        </div>
        <div className="about-info">
          <div className="about-info__container">
            <div className="about-info__wrap">
              <div className="about__line" />
              <div className="about__title">
                <Trans id="about_us_page_title">About us</Trans>
              </div>
              <div className="about__text">
                <Trans id="about_us_page_brief_text">
                 blah blah blah
                </Trans>
              </div>
              <I18n>
                {({ i18n }) => (
                  <img
                    alt={i18n._(t("pages.aboutus.aboutus_img_caption")`MIA`)}
                    className="section-img section-img--left"
                    src="./assets/images/about/aboutus.png"
                  />
                )}
              </I18n>
            </div>
          </div>
        </div>

        <div className="about-vision">
          <div className="about-vision__container">
            <div className="about-vision__wrap">
              <div className="about-vision__item about-vision__item--vision">
                <div className="about__title">
                  <Trans id="our_vision">Our vision</Trans>
                </div>
                <div className="about__text">
                  
                </div>
                <div className="about__line" />
              </div>
              <div className="about-vision__item about-vision__item--services _ms-show">
                <div className="about__title">
                  <Trans id="our_services">Our Services</Trans>:
                </div>
                <ul className="about-list">
                  <li className="about-list__item">
                    <span>
                      <Trans id="arrival_and_departure">Arrival and Departure</Trans>
                    </span>
                  </li>
                  <li className="about-list__item">
                    <span>
                      <Trans id="hotels_and_rooms">Hotels and Rooms</Trans>
                    </span>
                  </li>
                  <li className="about-list__item">
                    <span>
                      <Trans id="catering">Catering</Trans>
                    </span>
                  </li>
                  <li className="about-list__item">
                    <span>
                      <Trans id="transportation">Transportation</Trans>
                    </span>
                  </li>
                  <li className="about-list__item">
                    <span>
                      <Trans id="mazarat_and_tours">Mazarat and Touristic tours</Trans>
                    </span>
                  </li>
                </ul>
              </div>
              <I18n>
                {({ i18n }) => (
                  <img
                    alt={i18n._(t("pages.aboutus.vision_img_caption")`Vision`)}
                    className="section-img section-img--right"
                    src="./assets/images/about/vision.png"
                  />
                )}
              </I18n>
            </div>
          </div>
        </div>
        <div className="about-vision__item about-vision__item--services _ms-hide">
          <div className="about__title">
            <Trans id="our_services">Our Services</Trans>:
          </div>
          <ul className="about-list">
            <li className="about-list__item">
              <span>
                <Trans id="arrival_and_departure">Arrival and Departure</Trans>
              </span>
            </li>
            <li className="about-list__item">
              <span>
                <Trans id="hotels_and_rooms">Hotels and Rooms</Trans>
              </span>
            </li>
            <li className="about-list__item">
              <span>
                <Trans id="catering">Catering</Trans>
              </span>
            </li>
            <li className="about-list__item">
              <span>
                <Trans id="transportation">Transportation</Trans>
              </span>
            </li>
            <li className="about-list__item">
              <span>
              <Trans id="mazarat_and_tours">Mazarat and Touristic tours</Trans>
              </span>
            </li>
          </ul>
        </div>

        <div className="about-services">
          <div className="about-services__container">
            <div className="about-services__wrap">
              <div className="about-services__item">
                <div className="about-services__icon">
                  <svg width="70" height="70">
                    <use href="#service-1" />
                  </svg>
                </div>
                <div className="about-services__text">
                  <div className="about__subtitle">
                    <Trans id="arrival_and_departure_service">  Arrival and Departure Service </Trans>
                  </div>
                  <div className="about__text about__text--sm">
                    <Trans id="meeting_and_greeting_pilgrims_and_visitors">
                      Meeting and Greeting pilgrims and visitors at airports and others points of entry in di‑erent languages and provide
                      VIP services and guest with special needs.
                    </Trans>
                  </div>
                </div>
              </div>
              <div className="about-services__item">
                <div className="about-services__icon">
                  <svg width="70" height="70">
                    <use href="#service-2" />
                  </svg>
                </div>
                <div className="about-services__text">
                  <div className="about__subtitle">
                    <Trans id="hotels_and_rooms_service">Hotels and Rooms Service</Trans>
                  </div>
                  <div className="about__text about__text--sm">
                    <Trans id="for_your_convenience_we_provide_recommendation">
                      For your convenience, we provide various accommodation options through our Hotels and Rooms partners, which are just a
                      few meters away from the Holy Mosque, with 24-hour services and at competitive prices.
                    </Trans>
                  </div>
                </div>
              </div>
              <div className="about-services__item">
                <div className="about-services__icon">
                  <svg width="70" height="70">
                    <use href="#service-3" />
                  </svg>
                </div>
                <div className="about-services__text">
                  <div className="about__subtitle">
                    <Trans id="catering_service">Catering Service</Trans>
                  </div>
                  <div className="about__text about__text--sm">
                    <Trans id="to_enrich_your_visit">
                      To enrich your visit, we are pleased to provide ready-made meals and international cuisines buffet
                    </Trans>
                  </div>
                </div>
              </div>
              <div className="about-services__item">
                <div className="about-services__icon">
                  <svg width="70" height="70">
                    <use href="#service-4" />
                  </svg>
                </div>
                <div className="about-services__text">
                  <div className="about__subtitle">
                    <Trans id="transportation_service">Transportation Service</Trans>
                  </div>
                  <div className="about__text about__text--sm">
                    <Trans id="we_are_pleased_to_provide_transportation">
                      We are pleased to provide the latest transportation, such as buses and cars of various categories from reputed
                      transport companies, in addition to the Haramain High-Speed Railway tickets
                    </Trans>
                  </div>
                </div>
              </div>
              <div className="about-services__item">
                <div className="about-services__icon">
                  <svg width="70" height="70">
                    <use href="#service-5" />
                  </svg>
                </div>
                <div className="about-services__text">
                  <div className="about__subtitle">
                  <Trans id="mazarat_and_tours">Mazarat and Touristic tours</Trans>
                  </div>
                  <div className="about__text about__text--sm">
                  </div>
                </div>
              </div>
              <I18n>
                {({ i18n }) => (
                  <img
                    alt={i18n._(t("pages.aboutus.service_img_caption")`Services`)}
                    className="section-img section-img--left"
                    src="./assets/images/about/services.png"
                  />
                )}
              </I18n>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AboutUs;
