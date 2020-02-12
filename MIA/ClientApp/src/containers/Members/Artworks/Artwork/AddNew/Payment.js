import React, { useState } from "react";
import classNames from "classnames";
import { Trans, t } from "@lingui/macro";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import PaymentForm from "components/PaymentForm";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { I18n } from "@lingui/react";
import { useEffect } from "react";

const Payment = ({ active, register, awards = [], onPayment, processOrder, setPaymentToken, ...props }) => {
  const [selectedAward, setSelectedAward] = useState();
  const [awardConfirmed, setAwardConfirmed] = useState(false);
  const [useOnlinePayment, setUseOnlinePayment] = useState(true);

  useEffect(() => {
    setSelectedAward(awards[0]);
  }, [awards]);

  const selectAward = () => {
    setAwardConfirmed(true);
  };

  const setPaymentMethod = e => {
    setUseOnlinePayment(e.target.value.toLowerCase() == "online");
    // setValue("payment.paymentMethod", e.target.value.toLowerCase());
  };

  return (
    <div className={classNames("tab_content tab_payment", { active })}>
      <div className="all_payments_way">
        <BlockUi tag="div" blocking={awardConfirmed} className={classNames("pay_col_one", { move: awardConfirmed })}>
          {selectedAward && (
            <>
              <div className="item_top">
                <div className="imgthumb">
                  <img src={selectedAward.trophyUrl} />
                </div>
                <div className="desc">
                  <LanguageContext.Consumer>
                    {({ locale }) => (
                      <>
                        <span>
                          <Trans id={selectedAward.title[locale.code]}>{selectedAward.title[locale.code]}</Trans>
                        </span>
                        <p>you applied for {selectedAward.title[locale.code]} award please confirm to move on to the payment stage</p>

                        <div className="award_category">
                          <select
                            name="awardId"
                            ref={register}
                            onChange={a => {
                              const _award = awards.find(x => x.id == a.target.value);
                              setSelectedAward(_award);
                            }}
                          >
                            <I18n>
                              {({ i18n }) => {
                                {
                                  return awards.map((a, i) => (
                                    <option key={a.id} value={a.id}>
                                      {i18n._(a.code)}
                                    </option>
                                  ));
                                }
                              }}
                            </I18n>
                          </select>
                        </div>
                      </>
                    )}
                  </LanguageContext.Consumer>
                </div>
              </div>
              <div className="item_bottom">
                <div className="price">{selectedAward.artworkFee} USD</div>
                <div className="confirm">
                  <span onClick={selectAward}>Confirm</span>
                </div>
              </div>
            </>
          )}
        </BlockUi>
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
      </div>
    </div>
  );
};

export default Payment;
