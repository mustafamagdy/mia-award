import React, { useState, useEffect } from "react";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import * as Yup from "yup";

import Info from "./Info";
import Payment from "./Payment";
import { useForm } from "react-hook-form";
import { fileToBase64 } from "utils";
import { withRouter } from "react-router-dom";

const AddArtwork = ({ artworkDetails, addNewArtwork, awards, ...props }) => {
  const tabs = ["info", "payment"];
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

  const handleActiveTab = tabKey => {
    setActiveTabKey(tabKey);
    setActiveIndex(tabs.indexOf(tabKey));
  };

  const processOrder = async () => {
    const values = getValues({ nest: true });
    values.payment.paymentToken = paymentToken;

    //parse files to base64
    if (values.payment.paymentMethod == "offline") {
      const receipt = await fileToBase64(values.payment.receipt[0].name, values.payment.receipt[0]);
      values.payment.receiptFileName = values.payment.receipt[0].name;
      values.payment.receipt = receipt;
    } else {
      values.payment.receipt = undefined;
      values.payment = {
        paymentMethod: values.payment.paymentMethod,
        cardHolderName: values.payment.paymentToken.name,
        cardType: values.payment.paymentToken.card_type,
        last4Digit: values.payment.paymentToken.last4,
        cardToken: values.payment.paymentToken.token,
        currency: "USD",
        type: values.payment.paymentToken.type
      };
    }

    addNewArtwork(values);
  };

  const onPayment = values => {
    processOrder();
  };

  const saveArtworkInfo = infoValues => {
    setActiveTabKey("payment");
    setActiveIndex(tabs.indexOf("payment"));
  };

  return (
    <div className="stage_two">
      <div className="main_tabs">
        <ul>
          <TabList activeClassName="active" activeIndex={activeIndex} activeTabKey={activeTabKey} handleActiveTabWithKey={handleActiveTab}>
            {tabs.map((t, i) => (
              <Tab key={t} tabKey={t}>
                <li>
                  <Trans id={t}>{t}</Trans>
                </li>
              </Tab>
            ))}
          </TabList>
        </ul>
      </div>
      <Info
        active={activeTabKey == "info"}
        register={register}
        submitInfo={handleSubmit(saveArtworkInfo)}
        artworkId={artworkDetails && artworkDetails.id}
      />
      <Payment
        active={activeTabKey == "payment"}
        awards={awards}
        register={register}
        onPayment={handleSubmit(onPayment)}
        setPaymentToken={setPaymentToken}
        processOrder={processOrder}
      />
    </div>
  );
};

const mapStateToProps = ({ home: { awards }, members: { artworkDetails } }) => ({ awards, artworkDetails });
const mapDispatchToProps = dispatch => bindActionCreators({ ...membersActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddArtwork));
