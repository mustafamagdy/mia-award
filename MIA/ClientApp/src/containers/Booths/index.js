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
import BlockUi from "react-block-ui";
import PaymentForm from "components/PaymentForm";

const Booths = ({ fetchBooths, booths, boothBooked, bookBooth, ...props }) => {
  useEffect(() => {
    fetchBooths();
  }, []);

  const tabs = ["info", "details", "payment"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState("info");
  const [paymentToken, setPaymentToken] = useState(undefined);
  const [useOnlinePayment, setUseOnlinePayment] = useState(true);

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

    debugger;
    bookBooth(values);
  };

  useEffect(() => {
    if (paymentToken != undefined) {
      processOrder();
    }
  }, [paymentToken]);

  const onPayment = values => {
    debugger;
    processOrder();
  };

  const setPaymentMethod = e => {
    setUseOnlinePayment(e.target.value == "online");
  };

  return (
    <section id="booth_page">
      <div className="container">
        <div className="booth_row">
          <div className="col_left">
            <div className="imgthumb">
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
              {/* <span>
                <i className="icofont-ui-zoom-in"></i>
              </span> */}
            </div>
          </div>
          <div className="col_right">
            {!boothBooked && (
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
            )}
            <div id="zoom-img" className="tabs_content" />
            <div className="tabs_content">
              {!!boothBooked ? (
                <Confirmation active={boothBooked} success={true} />
              ) : (
                <>
                  <Info active={activeTabKey == "info"} register={register} booths={booths} />
                  <Details active={activeTabKey == "details"} register={register} />
                  <Payment
                    active={activeTabKey == "payment"}
                    // awards={awards}
                    register={register}
                    onPayment={handleSubmit(onPayment)}
                    setPaymentToken={setPaymentToken}
                    processOrder={processOrder}
                    useOnlinePayment={useOnlinePayment}
                    setPaymentMethod={setPaymentMethod}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Info = ({ booths, active, register, ...props }) => {
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
          name="boothCode"
          ref={register}
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

const Details = ({ active, register, ...props }) => {
  return (
    <div className={classNames("tab_item info_tab", { active })}>
      <div className="choose_booth">
        <input ref={register} name="contactName" />
        <input ref={register} name="phone1" />
        <input ref={register} name="phone2" />
        <input ref={register} name="email" />
      </div>
      <div className="next_step">
        <button type="button">
          <Trans id="next">Next</Trans>
        </button>
      </div>
    </div>
  );
};

const Payment = ({ active, register, useOnlinePayment, setPaymentMethod, setPaymentToken, onPayment, ...props }) => {
  return (
    <div className={classNames("tab_item payment_tab", { active })}>
      <div className="paymnets_area">
        <div className="title">
          <Trans id="choose_your_payment_method">Choose Your Payment Method</Trans>:
        </div>
        <div className="choose_area">
          <label htmlFor="online">
            <span>
              <Trans id="pay_online">Pay Online</Trans>
            </span>
            <input
              ref={register}
              type="radio"
              id="online"
              value="online"
              name="payment.paymentMethod"
              onChange={setPaymentMethod}
              checked={!!useOnlinePayment}
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
            <div className="next_step">
              <button id="pay-button" type="submit" form="payment-form">
                <Trans id="pay_and_continue">Pay & Continue</Trans>
              </button>
            </div>
          </BlockUi>
        </div>
        <div className="choose_area">
          <label htmlFor="offline">
            <span>
              <Trans id="pay_offline">Pay Offline</Trans>
            </span>
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
            <p>
              <Trans id="please_upload_the_receipt">
                please upload the reciept to be approved from the adminstration and confirm your payment
              </Trans>
            </p>
            <form id="offline-payment" onSubmit={onPayment}>
              <input ref={register} name="payment.receiptAmount" type="text" placeholder="Amount" />
              <input ref={register} name="payment.receiptNumber" type="text" placeholder="Transaction Number" />
              <input ref={register} name="payment.receiptDate" type="text" placeholder="Payment Date" />
              <div className="confirm">
                <input type="file" id="receipt" name="payment.receipt" ref={register} />
                <label htmlFor="receipt" className="btn-2">
                  <Trans id="choose_receipt_image">Choose receipt image</Trans>
                </label>
                <div className="next_step">
                  <button type="button" type="submit" form="offline-payment">
                    <Trans id="book_now">Book Now</Trans>
                  </button>
                </div>
              </div>
            </form>
          </BlockUi>
        </div>
      </div>
    </div>
  );
};

const Confirmation = ({ active, success, ...props }) => {
  return (
    <div className={classNames("tab_item confirmation_tab", { active })}>
      <div className="title">
        <Trans id="booth_booking_success">Booking successfull</Trans>
      </div>
      <div className="content">
        <Trans id="booth_booking_success_msg">Thank you please contact us @123456</Trans>
      </div>
    </div>
  );
};

const mapStateToProps = ({ home: { booths, boothBooked } }) => ({
  booths,
  boothBooked
});
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Booths);
