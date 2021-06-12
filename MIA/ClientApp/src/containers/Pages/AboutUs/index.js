import React, { useState } from "react";
import { Trans } from "@lingui/macro";
import Sponsers from "../../Home/Sponsers";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { I18n } from "@lingui/react";
import { connect } from "react-redux";

// import "sass/about.scss";

const AboutUs = ({ awards, ...props }) => {
  const [awardsTabs] = useState([
    {
      titlleKey: "about_awards",
    },
    {
      titlleKey: "mia_contestant",
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
  const content = {
    ourStory: {
      en:
        "In view of the great challenges that our Arab media has faced during the past decades and the underrepresentation of Arab reality in spite of the massive investments in the media sector in various respects, the media community realized the need for joint efforts between investors and production companies to put an end to this deficiency. This idea was adopted by Media Industry Company, a leading media company, by launching the MIA AWARD. This program focuses on visual content to increase competition, develop the content of Arab artistic works production industry and become the link between the investor and the producer in order to properly develop the visual and digital Arab reality. Competition evidently creates rich and distinct content that better reflects the Arab world’s public and audience.",
      ar:
        "نظراً لما مر به إعلامنا العربي خلال العقود الماضية من تحديات كبيرة، وعدم تمثيل للواقع العربي بالشكل الصحيح بالرغم من وجود استثمار كبير في مجال الإعلام من نواح مختلفة، برزت الحاجة في الوسط الإعلامي إلى تضافر الجهود بين المستثمرين وشركات الإنتاج لوضع حد لهذا النقص، وهو ما تبنته شركة صناعة الإعلام باعتبارها شركة رائدة  في مجال الإعلام من خلال تدشين MIA AWARD، وهي جائزة تهتم بالمحتوى المرئي لرفع مستوى التنافس وتطوير محتوى صناعة الفن و إنتاج الأعمال العربية، وبأن تكون حلقة الوصل بين المستثمر والمنتج لتطوير الواقع العربي “المرئي التلفزيوني والرقمي” بالشكل الصحيح، وليس بخاف على الجميع بأن المنافسة ستصنع محتوى ثريا ومميزا ينعكس أثره على جموع الجماهير والمتلقين في الوطن العربي.  ",
    },
    mia2020: {
      en:
        "With the participation of 21 Arab countries<br/>A new Arab Award specialized in visual media that will be launched in Dubai Opera in 15 December 2020, with the participation of 21 Arab countries. <br />In its first round, the Award aims to present a distinguished set of television and digital works to eager and enthusiastic audiences. The Award also seeks to create a kind of effective communication between the public, producers and technicians through its events. The Award also seeks to discover young talents, along with enhancing the spirit of cooperation, cultural exchange and advancement in the television and digital art industry in the Arab world, presenting new visions for the Arab production market needs; such as new and important ideas that strongly support and contribute to the development of Arab television productions enabling them to cross Arab borders and go global.",
      ar:
        "انطلقت رسالتنا من وحي شعارنا (الإعلام العربي واقع جديد) لرفع مستوى جودة المحتوى في الإنتاج العربي المرئي وجعل هذه الجائزة منصة عربية يكرم ويلتقي فيها كل المميزين والمبدعين في هذا المجال لتتلاقى من خلالها الأفكار الجديدة وتؤدي إلى نتاج معرفي وتقني تستفيد منه المجتمعات العربية وتواجه به تحدياتها المستقبلية المختلفة .",
    },
    ourMessage: {
      en:
        "<b>An Arab award going global</b><br /><br />The MIA AWARD which upholds the slogan: “Arab Media: New Realities”, is a manifestation of a distinct cultural and intellectual event, one of a kind in its field, as it helps strengthen links and exchange expertise between Arab innovators to achieve further intellectual creativity and stimulate the marketing of media production through a common Arab art market. The Award will also help examine the latest developments in communication technology through an exhibition accompanying the Award, in which devices and equipment that contribute to the development of all types of visual media production will be displayed, highlighting Arab productions and allowing outreach and dissemination of their contents to the largest segment of viewers.",
      ar:
        "<b>بمشاركة ٢١ دولة عربية </b><br />جائزة عربية جديدة في طرحها مختصة في محتوى الإعلام المرئي ، تعقد بدار الأوبرا في دبي في 15 شهر ديسمبر من عام 2020م بمشاركة 21 دولة عربية، وتهدف الجائزة في دورتها الأولى إلى عرض مجموعة مميزة من الأعمال  المرئية التلفزيونية و الرقمية للجمهور الشغوف بها والمتحمس لمتابعتها، كما تسعى لإيجاد نوع من التواصل الفعال بين كل من الجمهور والمنتجين والفنيين عبر فعالياتها، واكتشاف المواهب الشابة، بالإضافة إلى تعزيز روح التعاون والتبادل الثقافي والرقي بصناعة الفن المرئي التلفزيوني والرقمي في العالم العربي، وتقديم رؤى جديدة لما تحتاجه أسواق الإنتاج العربي من أفكار جديدة ومهمة لتكون رافداً قوياً يسهم في تطوير الأعمال المرئية العربية لتخطي حدود المحيط العربي والوصول إلى العالمية.",
    },
    ourGoal: [
      {
        en:
          "Refining the taste of the Arab individual from all segments and introducing new future visions that contribute to the advancement of Arab television production, also activating and motivating the television industry and raising the standard of Arab production to reach international levels. ",
        ar:
          "الارتقاء بذائقة الإنسان العربي بمختلف شرائحه، وتقديم رؤى مستقبلية جديدة تسهم في رقي مستقبل الإنتاج المرئي العربي . وتنشيط وتحفيز صناعة المحتوى المرئي ورفع مستوى الإنتاج العربي والرقي به إلى مصاف عالمية.",
      },
      {
        en:
          "Creating an opportunity for integration, interaction and multi-cultural convergence to reunify the Arab identity, so that together we create a bright future “with one power and promising generations”",
        ar:
          "إيجاد فرصة للإندماج والتفاعل وتقارب الثقافات المتعددة من أجل لم شمل الهوية العربية  لنصنع معاً مستقبل باهر  بقوة واحدة وأجيال واعدة ",
      },
      {
        en:
          "Increasing communication between young talents in the Arab world and prominent producers and technicians active in the field and offering greater cooperation between the production sectors and between media organizations, TV channels and digital platforms.",
        ar:
          "زيادة التواصل بين المواهب الشابة في العالم العربي ونخبة من المنتجين والفنيين العاملين في المجال وتوفير أكبر قدر من التعاون بين القطاعات الانتاجية وبين الهيئات الإعلامية والقنوات التلفزيونية و المنصات الرقمية.",
      },
      {
        en:
          "Discovering new talents and highlighting the distinguished ones.   ",
        ar: "اكتشاف المواهب الجديدة وإظهار المتميز منها إلى الأضواء.",
      },
      {
        en:
          "Appreciating and honoring the innovators and achievers across the Arab world by assessing their works, learning about professional opinions about them and celebrating the best.",
        ar:
          "تقدير وتكريم المبدعين والمنجزين في أرجاء الوطن العربي من خلال تقييم أعمالهم ومعرفة آراء المختصين حيالها والاحتفال بأفضلها .",
      },
    ],
    ourValues: [
      {
        title: { en: "Fairness", ar: "الحيادية" },
        content: {
          en: "We treat all the people of the Arab world equally and fairly.  ",
          ar: "نقف بدون انحياز وعلى مسافة واحدة من كل أبناء الوطن العربي.",
        },
      },
      {
        title: { en: "Objectivity", ar: "الموضوعية" },
        content: {
          en:
            "Independently of anybody’s whim, we depend on one unified mechanism in dealing with every performance your creativity determines your position.",
          ar:
            "بعيدًا عن الأهواء نعتمد آلية موحدة في التعامل مع كل أداء.. إبداعك هو من يحدد مركزك.",
        },
      },
      {
        title: { en: "Credibility", ar: "المصداقية" },
        content: {
          en:
            "One of the basic elements of our work ... integrity and professionalism represent our approach in evaluating the participating works.",
          ar:
            "من اساسيات جوهر عملنا, فالنزاهة والمهنية هي منهجنا في تقييم الأعمال المشاركة.",
        },
      },
    ],
    ourEvents: {
      header: {
        en: "Events held within the scope of the Award program:",
        ar: "يقام ضمن برنامج الجائزة",
      },
      items: [
        {
          en:
            "1.	Workshops to develop professional technical and technological capabilities.",
          ar: "1.	ورش عمل لتطوير القدرات المهنية الفنية والتقنية.",
        },
        {
          en:
            "2.	Specialized seminars by expert professional media makers and Arab stars. ",
          ar:
            "2.	ندوات متخصصة يلقيها خبراء و محترفون من صناع الإعلام ونجوم الفن العربي.",
        },
        {
          en: "3.	Presenting unique success stories.",
          ar: "3.	عرض قصص نجاح مميزة.",
        },
        {
          en:
            "4.	A special market serving production companies and digital and TV platforms, including the latest engineering and technological systems in media and TV production industry.",
          ar:
            "4.	سوق خاص لخدمة شركات الإنتاج والمنصات الرقمية، والتلفزيونية ، إذ يضم أحدث النظم الهندسية والتقنية في مجال صناعة الإعلام والإنتاج المرئي.",
        },
        {
          en:
            "5.	Live interviews and discussion of important issues (Live broadcast)",
          ar: "5.	لقاءات حية و مناقشة القضايا الهامة (بث مباشر(",
        },
      ],
    },
  };
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <I18n>
      {({ i18n }) => (
        <React.Fragment>
          <section id="about_us">
            <div className="about_txt">
              <div className="container">
                <div className="item">
                  <div className="title">
                    <Trans id="our_story"></Trans>
                  </div>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: content.ourStory[i18n.language],
                    }}
                  ></div>
                </div>
                <div className="item">
                  <div className="title">
                    <Trans id="mia_2020"></Trans>
                  </div>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: content.mia2020[i18n.language],
                    }}
                  ></div>
                </div>
                <div className="item">
                  <div className="title">
                    <Trans id="our_message"></Trans>
                  </div>
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{
                      __html: content.ourMessage[i18n.language],
                    }}
                  ></div>
                </div>
                <div className="item">
                  <div className="title">
                    <Trans id="our_goal"></Trans>
                  </div>
                  <div className="content">
                    <ul className="bullets">
                      {content.ourGoal.map((g, i) => (
                        <li
                          key={i}
                          dangerouslySetInnerHTML={{
                            __html: g[i18n.language],
                          }}
                        ></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="our_value">
              <div className="container">
                <div className="title">
                  <span>
                    <Trans id="our_value"></Trans>
                  </span>
                </div>
                <div className="content">
                  <ul>
                    {content.ourValues.map((g, i) => (
                      <li key={i}>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: g.title[i18n.language],
                          }}
                        ></span>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: g.content[i18n.language],
                          }}
                        ></p>
                      </li>
                    ))}
                  </ul>
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
                        <Trans id="our_events"></Trans>
                      </span>
                      <p className="subtitle"
                        dangerouslySetInnerHTML={{
                          __html: content.ourEvents.header[i18n.language],
                        }}
                      ></p>
                      <ul>
                        {content.ourEvents.items.map((g, i) => (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{
                              __html: g[i18n.language],
                            }}
                          ></li>
                        ))}
                      </ul>
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
                        <Trans id="our_awards"></Trans>
                      </span>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: i18n._("our_awards_text"),
                        }}
                      ></p>
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
                      <TabPanels
                        activeIndex={activeTab}
                        activeClassName="active"
                      >
                        {awardsTabs.map((t, i) => (
                          <TabPane key={i}>
                            {t.titlleKey == "about_awards" ? (
                              <div className="tab_content">
                                <Awards awards={awards} awardType="artwork" />
                              </div>
                            ) : t.titlleKey == "mia_contestant" ? (
                              <div className="tab_content">
                                <Awards awards={awards} awardType="person" />
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Sponsers />
        </React.Fragment>
      )}
    </I18n>
  );
};

const Awards = ({ awardType, awards, ...props }) => {
  const _awards = awards.filter((a) => a.awardType == awardType);
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
