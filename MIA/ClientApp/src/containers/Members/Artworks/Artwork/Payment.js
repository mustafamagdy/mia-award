import React, { useState } from "react";
import classNames from "classnames";
import { Trans, t } from "@lingui/macro";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import PaymentForm from "components/PaymentForm";
import { LanguageContext } from "containers/Providers/LanguageProvider";
import { I18n } from "@lingui/react";

const Payment = ({ awards = [], onPayment, ...props }) => {
  const [selectedAward, setSelectedAward] = useState(awards[0]);
  const [awardConfirmed, setAwardConfirmed] = useState(false);
  const [useOnlinePayment, setUseOnlinePayment] = useState(true);

  const selectAward = () => {
    setAwardConfirmed(true);
  };
  const setPaymentMethod = e => {
    setUseOnlinePayment(e.target.value.toLowerCase() == "online");
  };

  return (
    <div className="tab_content tab_payment">
      <div className="all_payments_way">
        <div className="next_step">
          <span>Next</span>
        </div>
        <BlockUi tag="div" blocking={awardConfirmed} className={classNames("pay_col_one", { move: awardConfirmed })}>
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
                        name="award"
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
        </BlockUi>
        <BlockUi tag="div" blocking={!awardConfirmed} className={classNames("pay_col_two", { active: awardConfirmed })}>
          <label>Choose Your Payment Method :</label>
          <div className="choose_area">
            <label htmlFor="payOnline">
              <span>Pay Online</span>
              <input type="radio" id="payOnline" name="customRadio" value="online" onChange={setPaymentMethod} checked={useOnlinePayment} />
              <div className="checkmark"></div>
            </label>
            <BlockUi tag="div" blocking={!useOnlinePayment} className={classNames("pay_online_form", { move: !useOnlinePayment })}>
              <img src="/assets/images/pay_logo.png" />
              <PaymentForm cardTokenized={token => onPayment(true, token)} />
              <div className="confirm">
                <button id="pay-button" type="submit" form="payment-form">
                  Pay & Continue
                </button>
              </div>
            </BlockUi>
          </div>
          <div className="choose_area">
            <label htmlFor="payOffline">
              <span>Pay Offline</span>
              <input
                type="radio"
                id="payOffline"
                value="offline"
                name="customRadio"
                onChange={setPaymentMethod}
                checked={!useOnlinePayment}
              />
              <div className="checkmark"></div>
            </label>
            <BlockUi tag="div" blocking={useOnlinePayment} className={classNames("pay_offline_form", { move: useOnlinePayment })}>
              <p>please upload the reciept to be approved from the adminstration and confirm your payment</p>
              <form action="#">
                <input type="text" placeholder="Amount" />
                <input type="text" placeholder="Transaction Number" />
                <input type="text" placeholder="Payment Date" />
                <div className="confirm">
                  <input type="file" id="file" />
                  <label htmlFor="file" className="btn-2">
                    Choose receipt image
                  </label>
                  <button type="submit">Submit</button>
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
