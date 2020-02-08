import React, { useState } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import Info from "./Info";
import Payment from "./Payment";
import Trailer from "./Trailer";
import Files from "./Files";

const Artwork = props => {
  const tabs = [
    { key: "info", status: true },
    { key: "payment", status: true },
    { key: "trailer", status: true },
    { key: "upload", status: true }
  ];

  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = tab => {
    setActiveTab(tab);
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
        <TabPanels activeIndex={activeTab} activeClassName="active">
          <TabPane>
            <Info />
          </TabPane>
          <TabPane>
            <Payment />
          </TabPane>
          <TabPane>
            <Trailer />
          </TabPane>
          <TabPane>
            <Files />
          </TabPane>
        </TabPanels>
      </div>
    </React.Fragment>
  );
};
export default Artwork;
