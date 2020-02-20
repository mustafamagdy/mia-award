import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { connect } from "react-redux";
import membersActions from "store/members/actions";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { fileToBase64 } from "utils";
import { withRouter } from "react-router-dom";

const Booths = props => {
  const tabs = ["info", "payment"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [paymentToken, setPaymentToken] = useState(undefined);

  const { register, handleSubmit, getValues, setValue } = useForm();

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

    // addNewArtwork(values);
  };

  const onPayment = values => {
    processOrder();
  };

  return (
    <section id="booth_page">
      <div className="container">
        <div className="booth_row">
          <div className="col_left">
            <div className="imgthumb">
              <img src="assets/images/booth_image.png" />
              <span>
                <i className="icofont-ui-zoom-in"></i>
              </span>
            </div>
          </div>
          <div className="col_right">
            <div className="tabs_links">
              <ul>
                <TabList
                  activeClassName="active"
                  activeIndex={activeIndex}
                  activeTabKey={activeTabKey}
                  handleActiveTabWithKey={handleActiveTab}
                >
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
            <div className="tabs_content">
              <Info active={activeTabKey == "info"} register={register} />
              <Payment
                active={activeTabKey == "payment"}
                // awards={awards}
                register={register}
                onPayment={handleSubmit(onPayment)}
                setPaymentToken={setPaymentToken}
                processOrder={processOrder}
              />
              <Confirmation finished={false} success={false} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ booths, active, register, submitInfo, ...props }) => {
  return (
    <div className={classNames("tab_item info_tab", { active })}>
      <div className="labels_area">
        <ul>
          <li className="booth_1">Booth type 1</li>
          <li className="booth_2">Booth type 2</li>
          <li className="booth_3">Booth type 3</li>
          <li className="booth_4">Booth type 4</li>
          <li className="booth_5">Booth type 5</li>
        </ul>
      </div>
      <div className="choose_booth">
        <select name="" id="">
          <option value="" selected>
            Booth type 1
          </option>
          <option value="">Booth type 2</option>
          <option value="">Booth type 3</option>
          <option value="">Booth type 4</option>
          <option value="">Booth type 5</option>
        </select>
        <span>1,250 USD</span>
      </div>
      <div className="title">AREA: 9 X 6 m</div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices
        gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
        maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. .
      </div>
      <div className="next_step">
        <button type="button">Next</button>
      </div>
    </div>
  );
};

const Payment = ({ active, ...props }) => {
  return (
    <div className={classNames("tab_item payment_tab", { active })}>
      <div className="paymnets_area">
        <div className="title">Choose Your Payment Method :</div>
        <div className="choose_area">
          <label for="payOnline">
            <span>Pay Online</span>
            <input type="radio" id="payOnline" name="customRadio" />
            <div className="checkmark"></div>
          </label>
          <div className="pay_online_form">
            <div className="pay_icons">
              <span>
                <img src="assets/images/pay1.png" />
              </span>
              <span>
                <img src="assets/images/pay2.png" />
              </span>
              <span>
                <img src="assets/images/pay3.png" />
              </span>
              <span>
                <img src="assets/images/pay4.png" />
              </span>
            </div>
          </div>
        </div>
        <div className="choose_area">
          <label for="payOffline">
            <span>Pay Offline</span>
            <input type="radio" id="payOffline" name="customRadio" />
            <div className="checkmark"></div>
          </label>
          <div className="pay_offline_form">
            <p>please upload the reciept to be approved from the adminstration and confirm your payment</p>
          </div>
        </div>
        <div className="Upload">
          <input type="file" id="file" />
          <label for="file" className="btn-2">
            Upload
          </label>
        </div>
        <div className="next_step">
          <button type="button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

const Confirmation = ({ active, success, ...props }) => {
  return (
    <div className={classNames("tab_item confirmation_tab", { active })}>
      <div className="title">booking successfull</div>
      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
        ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
      </div>
    </div>
  );
};

export default Booths;
