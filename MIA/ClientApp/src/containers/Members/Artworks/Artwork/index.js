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

const Artwork = ({ artworkDetails, awards, saveInfoStep, infoStep, ...props }) => {
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

  const [tabs, setTabs] = useState([
    { key: "info", status: true },
    { key: "payment", status: false }
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {}
  });

  const handleActiveTab = tab => {
    let status = true;
    status &= tabs.slice(0, tab).every(a => a.status);
    if (status) {
      setActiveTab(tab);
      const _key = tabs[tab].key;
      setActiveTabKey(_key);
    }
  };

  const payAndContinue = (isOnline, paymentToken) => {
    console.log("payed online?", isOnline, paymentToken);
  };

  const gotoPayment = infoValues => {
    console.log("=>", infoValues);
    // saveInfoStep(infoValues);
    const paymentTab = tabs.find(a => a.key == "payment");
    if (!!paymentTab) {
      setActiveTab(tabs.indexOf(paymentTab));
      setActiveTabKey(paymentTab.key);
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
        <Info active={activeTabKey == "info"} register={register} submitInfo={handleSubmit(gotoPayment)} />
        <Payment active={activeTabKey == "payment"} awards={awards} onPayment={payAndContinue} />
        {/* <Trailer active={activeTabKey == "trailer"} register={register} />
        <Files active={activeTabKey == "upload"} register={register} /> */}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards }, members: { artworkDetails, infoStep } }) => ({ awards, artworkDetails, infoStep });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artwork);
