import React, { useState } from "react";
import { Trans } from "@lingui/macro";
import Partners from "../../Home/Partners";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { I18n } from "@lingui/react";
import { connect } from "react-redux";

// import "sass/about.scss";

const AboutUs = ({ awards, ...props }) => {
  const [awardsTabs] = useState([
    {
      titlleKey: "about_awards",
      contentKey: `about_tab_content_awards`,
    },
    {
      titlleKey: "mia_contestant",
      contentKey: `about_tab_content_mia_contestant`,
    },
    {
      titlleKey: "mia_honor",
      contentKey: `about_tab_content_mia_honor`,
    },
    {
      titlleKey: "judge",
      contentKey: `about_tab_content_judge`,
    },
    {
      titlleKey: "conpatitors",
      contentKey: `about_tab_content_conpatitors`,
    },
  ]);

  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <React.Fragment>
      <section id="about_us">
        <div className="about_txt">
          <div className="container">
            <div className="item">
              <div className="title">
                <Trans id="story">Story</Trans>
              </div>
              <div className="content">
                <Trans id="story_text">
                  The Arab media passes during the past decades a lot of
                  challenges and the lack of representation of the Arab reality
                  with the correct representation, despite the presence of a
                  large investment in the field of media in all its forms, but
                  it lacks concerted efforts between investors and production
                  companies. Art making and Arab business production by being
                  the link between the investor and the producer in order to
                  transfer the Arab "television" reality to the right path by
                  creating an award for visual media, believing that the
                  competition will create rich and distinctive content that will
                  affect its audience. Dowries and recipients in the Arab world
                </Trans>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <Trans id="our_message">Our Message</Trans>
              </div>
              <div className="content">
                <Trans id="our_message_text">
                  Recent studies have proven the importance of television
                  content in our daily lives and its influence on changing
                  values ​​and cultural awareness in any society. It is for this
                  importance that our message was launched from the slogan of
                  our slogan (Arab media is a new reality) to raise the level of
                  quality content in Arab television production and make this
                  award an Arab platform that honors and meets all the
                  distinguished and creative in this field, during which new
                  ideas converge and lead to a knowledge and technical product
                  that Arab societies benefit from and confront with it Its
                  various future challenges
                </Trans>
              </div>
            </div>
            <div className="item">
              <div className="title">
                <Trans id="our_goal">Our Goal</Trans>
              </div>
              <div className="content">
                <Trans id="our_goal_text">
                  <ul>
                    <li>
                      • Upgrading the taste of the Arab person in its various
                      segments, and presenting new future visions that
                      contribute to advancing the future of Arab TV production.
                    </li>
                    <li>
                      • Activating and stimulating the TV content industry and
                      raising the level of Arab production and promoting it to
                      international ranks
                    </li>
                    <li>
                      • Finding an opportunity for integration, interaction and
                      the convergence of multiple cultures in order to integrate
                      the Arab identity, so that we can together create a
                      brilliant future With One Power and Promising Generations
                    </li>
                    <li>
                      • Increasing the communication between the young talents
                      in the Arab world and the elite producers and technicians
                      working in the field and providing the greatest degree of
                      integration between the productive sectors and between the
                      media organizations and TV channels
                    </li>
                    <li>
                      • Discover new talents and show distinguished ones to the
                      limelight
                    </li>
                    <li>
                      • Appreciating and honoring the creators and accomplished
                      people throughout the Arab world by evaluating their work,
                      knowing the opinions of the specialists about it and
                      celebrating its best.
                    </li>
                  </ul>
                </Trans>
              </div>
            </div>
          </div>
        </div>
        <div className="our_value">
          <div className="container">
            <div className="title">
              <span>
                <Trans id="our_value">our value</Trans>
              </span>
            </div>
            <div className="content">
              <Trans id="our_value_text">
                <ul>
                  <li>
                    <span>• Neutrality :</span>
                    <p>
                      We stand without siding and one distance from all the
                      people of the Arab world
                    </p>
                  </li>
                  <li>
                    <span>• Objectivity :</span>
                    <p>
                      Away from the whims, one mechanism in dealing with each
                      performance. <br /> Your creativity determines your
                      position
                    </p>
                  </li>
                  <li>
                    <span>• Credibility :</span>
                    <p>
                      One of the basic principles of our work .. Our integrity
                      is our method in our evaluation
                    </p>
                  </li>
                  <li>
                    <span>• Enhancement :</span>
                    <p>
                      Providing numerous quality awards and discretionary seals
                      according to performance criteria
                    </p>
                  </li>
                </ul>
              </Trans>
            </div>
          </div>
        </div>
        <div className="our_events">
          <div className="container">
            <div className="event">
              <div className="icon">
                <img src="/assets/images/our_value_icon.png" />
              </div>
              <div className="txt_area">
                <div className="inside_txt_area">
                  <span>
                    <Trans id="our_events">Our Events</Trans>
                  </span>
                  <Trans id="our_events_text">
                    <ul>
                      <li>
                        • Workshops to develop technical and technical
                        professional capabilities
                      </li>
                      <li>
                        • Specialized seminars, to be hosted by experts and
                        professionals from the media makers and Arab art stars
                      </li>
                      <li>• View distinctive success stories</li>
                      <li>
                        • Market for the most recent engineering and technical
                        systems in the field of media and television production
                      </li>
                      <li>
                        • TV interviews discussing important issues (live
                        broadcast)
                      </li>
                    </ul>
                  </Trans>
                </div>
              </div>
            </div>
            <div className="imgthumb">
              <img src="/assets/images/our_events_img.png" />
            </div>
          </div>
        </div>
        <div className="our_awards">
          <div className="container">
            <div className="imgthumb">
              <div className="img">
                <img src="/assets/images/our_awards_img.png" />
              </div>
            </div>
            <div className="award">
              <div className="icon">
                <img src="/assets/images/our_award_icon.png" />
              </div>
              <div className="txt_area">
                <div className="inside_txt_area">
                  <span>
                    <Trans id="our_awards">Our Awards</Trans>
                  </span>
                  <p>
                    <Trans id="our_awards_text">
                      The Arab Media Makers Award (MIA 2020), which is judged
                      among contestants electronically, aims to measure the
                      quality of the level of influence of the content of TV
                      works on the lifestyle, audience thinking and impact by
                      sorting the participating works according to specific
                      conditions and criteria by the jury, and we have dedicated
                      to each Category of the competition is three gold, silver
                      and bronze prizes distributed to the winners with
                      appreciation certificates
                    </Trans>
                  </p>
                  <ul>
                    <TabList
                      activeClassName="active"
                      activeIndex={activeTab}
                      handleActiveTab={handleActiveTab}
                    >
                      {awardsTabs.map((t, i) => (
                        <Tab key={t.titlleKey}>
                          <li>
                            <Trans id={t.titlleKey}></Trans>
                          </li>
                        </Tab>
                      ))}
                    </TabList>
                  </ul>
                  <I18n>
                    {({ i18n }) => (
                      <TabPanels
                        activeIndex={activeTab}
                        activeClassName="active"
                      >
                        {awardsTabs.map((t, i) => (
                          <TabPane>
                            {t.titlleKey == "about_awards" ? (
                              <div className="tab_content">
                                <Awards awards={awards} type="artwork" />
                              </div>
                            ) : t.titlleKey == "mia_contestant" ? (
                              <div className="tab_content">
                                <Awards awards={awards} type="person" />
                              </div>
                            ) : (
                              <div
                                className="tab_content"
                                dangerouslySetInnerHTML={{
                                  __html: i18n._(
                                    awardsTabs[activeTab].contentKey
                                  ),
                                }}
                              ></div>
                            )}
                          </TabPane>
                        ))}
                      </TabPanels>
                    )}
                  </I18n>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Partners />
    </React.Fragment>
  );
};

const Awards = ({ type, awards, ...props }) => {
  const _awards = awards.filter((a) => a.awardType == type);
  return (
    <I18n>
      {({ i18n }) => (
        <ul className="items">
          {_awards.map((a, i) => (
            <li className="item" key={i}>
              • {a.title[i18n.language]}
            </li>
          ))}
        </ul>
      )}
    </I18n>
  );
};

const mapStateToProps = ({ home: { awards } }) => ({ awards });
export default connect(mapStateToProps)(AboutUs);
