import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";

import Info from "./Info";
import Payment from "./Payment";
import Trailer from "./Trailer";
import Files from "./Files";
import { useForm } from "react-hook-form";

const Artwork = ({ artworkDetails, ...props }) => {
  useEffect(() => {
    if (artworkDetails == undefined) {
      setTabs([
        { key: "info", status: true },
        { key: "payment", status: false }
      ]);
    } else {
      setTabs([
        { key: "info", status: true },
        { key: "payment", status: false },
        { key: "trailer", status: false },
        { key: "upload", status: false }
      ]);
    }
  }, []);

  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: { ar: "", en: "" },
      country: "",
      year: "",
      about: "",
      story: "",
      directors: "", //[],
      producers: "", //[],
      writers: "", //[],
      stars: "", //[],
      crew: "", //[]
      payment: {

      }
    }
  });

  const handleActiveTab = tab => {
    let status = true;
    status &= tabs.slice(0, tab).every(a => a.status);
    if (status) {
      setActiveTab(tab);
    }
  };

  return (
    <React.Fragment>
      <div className="upload_poster">
        <div className="upload_area">
          <form action="#">
            <input type="file" />
            <i className="icofont-plus"></i>
            <span>Upload show poster</span>
          </form>
        </div>
      </div>
      <div className="stage_two">
        <div className="main_tabs">
          <ul>
            <TabList activeClassName="active" activeIndex={activeTab} handleActiveTab={handleActiveTab}>
              {tabs.map((t, i) => (
                <Tab key={t.key}>
                  <li>
                    <Trans id={t.key}>{t.key}</Trans>
                  </li>
                </Tab>
              ))}
            </TabList>
          </ul>
        </div>
        <TabPanels activeIndex={activeTab} activeTabKey={tabs && tabs[activeTab] && tabs[activeTab].key} activeClassName="active">
          <TabPane paneKey="info">
            <Info register={register} />
          </TabPane>
          <TabPane paneKey="payment">
            <Payment register={register} />
          </TabPane>
          <TabPane paneKey="trailer">
            <Trailer register={register} />
          </TabPane>
          <TabPane paneKey="files">
            <Files register={register} />
          </TabPane>
        </TabPanels>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ members: { artworkDetails } }) => ({ artworkDetails });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artwork);
