import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { TabList, Tab, TabPane, TabPanels } from "components/Tabs";
import { Trans } from "@lingui/macro";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { connect } from "react-redux";
import homeActions from "store/home/actions";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { fileToBase64 } from "utils";
import { withRouter } from "react-router-dom";
import { ImageZoom } from "react-simple-image-zoom";
import { Dropdown } from "components/Forms";
const Booths = ({ fetchBooths, booths, ...props }) => {
  useEffect(() => {
    fetchBooths();
  }, []);

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
              <div style={{ width: "540px", marginLeft: "20px", overflow: "hidden" }}>
                <ImageZoom
                  portalId="zoom-img"
                  largeImgSrc="assets/images/booth_image.png"
                  imageWidth={540}
                  imageHeight={540}
                  zoomContainerWidth={540}
                  portalStyle={Object.assign({ ...ImageZoom.defaultPortalStyle }, { top: "140px" })}
                  zoomScale={3}
                  responsive={true}
                >
                  <img src="assets/images/booth_image.png" />
                </ImageZoom>
              </div>
              {/* <span>
                <i className="icofont-ui-zoom-in"></i>
              </span> */}
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
            <div id="zoom-img" className="tabs_content" />
            <div className="tabs_content">
              <Info active={activeTabKey == "info"} register={register} booths={booths} />
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
  const [selectedBooth, setSelectedBooth] = useState(undefined);
  useEffect(() => {
    setSelectedBooth(booths[0]);
  }, [booths]);

  return (
    <div className={classNames("tab_item info_tab", { active })}>
      {/* <div className="labels_area">
        <ul>
          <li className="booth_1">Booth type 1</li>
          <li className="booth_2">Booth type 2</li>
          <li className="booth_3">Booth type 3</li>
          <li className="booth_4">Booth type 4</li>
          <li className="booth_5">Booth type 5</li>
        </ul>
      </div> */}
      <div className="choose_booth">
        <select
          onChange={e => {
            const _b = booths.find(a => a.code == e.target.value);
            setSelectedBooth(_b);
          }}
        >
          {booths.map(a => (
            <option key={a.code} value={a.code} selected={selectedBooth && a.code == selectedBooth.code}>
              {a.code}
            </option>
          ))}
        </select>

        {selectedBooth && <span>{selectedBooth.price} USD</span>}
      </div>
      <div className="title">
        <Trans id="area">AREA</Trans>: {selectedBooth && selectedBooth.area}
      </div>
      <LanguageContext.Consumer>
        {({ locale }) => <div className="content">{selectedBooth && selectedBooth.description[locale.code]}</div>}
      </LanguageContext.Consumer>
      <div className="next_step">
        <button type="button">
          <Trans id="next">Next</Trans>
        </button>
      </div>
    </div>
  );
};

const Payment = ({ active, ...props }) => {
  return (
    <div className={classNames("tab_item payment_tab", { active })}>
      <div className="paymnets_area">
        <div className="title">Choose Your Payment Method :</div>
        <BlockUi tag="div" blocking={!awardConfirmed} className={classNames("pay_col_two", { active: awardConfirmed })}>
          <label>Choose Your Payment Method :</label>
          <div className="choose_area">
            <label htmlFor="online">
              <span>Pay Online</span>
              <input
                ref={register}
                type="radio"
                id="online"
                value="online"
                name="payment.paymentMethod"
                onChange={setPaymentMethod}
                checked={useOnlinePayment}
              />
              <div className="checkmark"></div>
            </label>
            <BlockUi tag="div" blocking={!useOnlinePayment} className={classNames("pay_online_form", { move: !useOnlinePayment })}>
              <img src="/assets/images/pay_logo.png" />
              <PaymentForm
                cardTokenized={token => {
                  setPaymentToken(token);
                }}
              />
              <div className="confirm">
                <button id="pay-button" type="submit" form="payment-form">
                  Pay & Continue
                </button>
              </div>
            </BlockUi>
          </div>
          <div className="choose_area">
            <label htmlFor="offline">
              <span>Pay Offline</span>
              <input
                ref={register}
                type="radio"
                id="offline"
                value="offline"
                name="payment.paymentMethod"
                onChange={setPaymentMethod}
                checked={!useOnlinePayment}
              />
              <div className="checkmark"></div>
            </label>
            <BlockUi tag="div" blocking={useOnlinePayment} className={classNames("pay_offline_form", { move: useOnlinePayment })}>
              <p>please upload the reciept to be approved from the adminstration and confirm your payment</p>
              <form id="offline-payment" onSubmit={onPayment}>
                <input ref={register} name="payment.receiptAmount" type="text" placeholder="Amount" />
                <input ref={register} name="payment.receiptNumber" type="text" placeholder="Transaction Number" />
                <input ref={register} name="payment.receiptDate" type="text" placeholder="Payment Date" />
                <div className="confirm">
                  <input type="file" id="receipt" name="payment.receipt" ref={register} />
                  <label htmlFor="receipt" className="btn-2">
                    Choose receipt image
                  </label>
                  <button form="offline-payment" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </BlockUi>
          </div>
        </BlockUi>
        <div className="Upload">
          <input type="file" id="file" />
          <label htmlFor="file" className="btn-2">
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

const mapStateToProps = ({ home: { booths } }) => ({
  booths
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Booths);
