import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import * as Yup from "yup";

import Info from "./Info";
import Payment from "./Payment";
import Trailer from "./Trailer";
import Files from "./Files";
import { useForm } from "react-hook-form";
import PaymentView from "./PaymentView";
import { fileToBase64 } from "utils";

const Artwork = ({ artworkDetails, addNewArtwork, awards, ...props }) => {
  useEffect(() => {
    if (artworkDetails == undefined) {
      setTabs([
        { key: "info", status: true },
        { key: "payment", status: true }
      ]);
    } else {
      const viewTabs = [
        { key: "info", status: true },
        { key: "payment-view", status: true },
        { key: "trailer", status: true }
      ];

      if (!!artworkDetails.canUploadFiles) viewTabs.push({ key: "upload", status: true });
      setTabs(viewTabs);
    }

    setActiveTabKey("info");
    setActiveIndex(0);
  }, [artworkDetails]);

  const [tabs, setTabs] = useState([
    { key: "info", status: true },
    { key: "payment", status: true },
    { key: "payment-view", status: false },
    { key: "trailer", status: false },
    { key: "upload", status: false }
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [paymentToken, setPaymentToken] = useState(undefined);

  const { register, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      payment: {
        paymentMethod: "online"
      }
    }
    // validationSchema: Yup.object({
    //   title: Yup.object({
    //     ar: Yup.string()
    //       .required()
    //       .min(5)
    //       .max(500),
    //     en: Yup.string()
    //       .required()
    //       .min(5)
    //       .max(500)
    //   }),
    //   about: Yup.string()
    //     .required()
    //     .min(100)
    //     .max(1000),
    //   directors: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   production: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   writers: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   story: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   stars: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   crew: Yup.string()
    //     .required()
    //     .min(10)
    //     .max(1000),
    //   payment: Yup.object({
    //     paymentMethod: Yup.string().required(),
    //     paymentToken: Yup.string().when("paymentMethod", {
    //       is: "online",
    //       then: Yup.string().required()
    //     }),
    //     receiptDate: Yup.string().when("paymentMethod", {
    //       is: "offline",
    //       then: Yup.string().required()
    //     }),
    //     receiptNumber: Yup.string().when("paymentMethod", {
    //       is: "offline",
    //       then: Yup.string().required()
    //     }),
    //     receiptAmount: Yup.string().when("paymentMethod", {
    //       is: "offline",
    //       then: Yup.number()
    //         .required()
    //         .min(0)
    //         .max(1000000)
    //     })
    //   })
    // })
  });

  useEffect(() => {
    if (paymentToken != undefined) {
      processOrder();
    }
  }, [paymentToken]);

  const tabAllowed = tabKey => {
    const _tab = tabs.find(a => a.key == tabKey);
    const allowed = _tab != undefined && _tab.status == true;
    return !!allowed;
  };

  const tabActive = tabKey => {
    const active = tabAllowed(tabKey) && activeTabKey == tabKey;
    return !!active;
  };

  const handleActiveTab = tabKey => {
    console.log("clicked ion", tabKey, tabs);
    // let status = true;
    // status &= tabs.slice(0, tab).every(a => a.status);
    // if (status) {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabs.find(a => a.key == tabKey)));
    // }
  };

  const processOrder = async () => {
    const values = getValues({ nest: true });
    values.payment.paymentToken = paymentToken;

    //parse files to base64
    if (values.payment.paymentMethod == "offline") {
      const receipt = await fileToBase64(values.payment.receipt[0].name, values.payment.receipt[0]);
      values.payment.receiptFileName = values.payment.receipt[0].name;
      values.payment.receipt = receipt;
    }

    addNewArtwork(values);
  };

  const onPayment = values => {
    console.log("payment ", values);
    processOrder();
  };

  const saveArtworkInfo = infoValues => {
    if (artworkDetails && artworkDetails.id) {
      //todo update artwork
    } else {
      const paymentTab = tabs.find(a => a.key == "payment");
      if (!!paymentTab) {
        setActiveTabKey(paymentTab.key);
        setActiveIndex(tabs.indexOf(paymentTab));
      }
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
            <TabList
              activeClassName="active"
              activeIndex={activeIndex}
              activeTabKey={activeTabKey}
              handleActiveTabWithKey={handleActiveTab}
            >
              {tabs
                .filter(a => a.status == true)
                .map((t, i) => (
                  <Tab key={t.key} tabKey={t.key}>
                    <li>
                      <Trans id={t.key}>{t.key}</Trans>
                    </li>
                  </Tab>
                ))}
            </TabList>
          </ul>
        </div>
        {tabAllowed("info") && (
          <Info
            active={tabActive("info")}
            register={register}
            submitInfo={handleSubmit(saveArtworkInfo)}
            artworkId={artworkDetails && artworkDetails.id}
          />
        )}
        {tabAllowed("payment") && (
          <Payment
            active={tabActive("payment")}
            awards={awards}
            register={register}
            onPayment={handleSubmit(onPayment)}
            setPaymentToken={setPaymentToken}
            processOrder={processOrder}
          />
        )}
        {tabAllowed("payment-view") && (
          <PaymentView active={tabActive("payment-view")} details={artworkDetails && artworkDetails.payment} />
        )}
        {tabAllowed("trailer") && (
          <Trailer
            active={tabActive("trailer")}
            trailerUrl={artworkDetails && artworkDetails.trailerUrl}
            artworkId={artworkDetails && artworkDetails.id}
          />
        )}
        {tabAllowed("upload") && <Files active={activeTabKey == "upload"} artworkId={artworkDetails && artworkDetails.id} />}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = ({ home: { awards }, members: { artworkDetails } }) => ({ awards, artworkDetails });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Artwork);
