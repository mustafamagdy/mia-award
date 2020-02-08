import React, { useState } from "react";
import classNames from "classnames";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import PaymentForm from "../../../../components/PaymentForm";

const Payment = props => {
  const [awardSelected, setAwardSelected] = useState(false);
  const [useOnlinePayment, setUseOnlinePayment] = useState(true);

  const selectAward = () => {
    setAwardSelected(true);
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
        <BlockUi tag="div" blocking={awardSelected} className={classNames("pay_col_one", { move: awardSelected })}>
          <div className="item_top">
            <div className="imgthumb">
              <img src="/assets/images/award_sport.png" />
            </div>
            <div className="desc">
              <span>movies</span>
              <p>you applied for movies award please confirm to move on to the payment stage</p>
              <div className="award_category">
                <select name="" id="">
                  <option value="" selected>
                    Change Award Category
                  </option>
                  <option value="">drama</option>
                  <option value="">sport</option>
                  <option value="">drama</option>
                  <option value="">sport</option>
                  <option value="">drama</option>
                  <option value="">sport</option>
                  <option value="">drama</option>
                  <option value="">sport</option>
                </select>
              </div>
            </div>
          </div>
          <div className="item_bottom">
            <div className="price">250 USD</div>
            <div className="confirm">
              <span onClick={selectAward}>Confirm</span>
            </div>
          </div>
        </BlockUi>
        <BlockUi tag="div" blocking={!awardSelected} className={classNames("pay_col_two", { active: awardSelected })}>
          <label for="#">Choose Your Payment Method :</label>
          <div className="choose_area">
            <label for="payOnline">
              <span>Pay Online</span>
              <input type="radio" id="payOnline" name="customRadio" value="online" onChange={setPaymentMethod} checked={useOnlinePayment} />
              <div className="checkmark"></div>
            </label>
            <BlockUi tag="div" blocking={!useOnlinePayment} className={classNames("pay_online_form", { move: !useOnlinePayment })}>
              <img src="/assets/images/pay_logo.png" />
              <PaymentForm />
              <div className="confirm">
                <button type="submit">Pay & Continue</button>
              </div>
            </BlockUi>
          </div>
          <div className="choose_area">
            <label for="payOffline">
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
                  <label for="file" className="btn-2">
                    Upload
                  </label>
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
