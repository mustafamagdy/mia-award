import React from "react";
import "./style.scss";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class PaymentForm extends React.Component {
  fetchJsFromCDN = src =>
    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("src", src);
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", reject);
      document.body.appendChild(script);
    });

  componentDidMount() {
    this.fetchJsFromCDN("https://cdn.checkout.com/js/framesv2.min.js").then(() => {
      this.payButton = document.getElementById("pay-button");
      this.form = document.getElementById("payment-form");
      window.Frames.init("pk_test_b3d915b2-18dc-43d9-8eff-bbd797f8e6b8");

      this.logos = this.generateLogos();
      this.errors = {
        "card-number": "Please enter a valid card number",
        "expiry-date": "Please enter a valid expiry date",
        cvv: "Please enter a valid cvv code"
      };

      window.Frames.addEventHandler(window.Frames.Events.FRAME_VALIDATION_CHANGED, this.onValidationChanged);
      window.Frames.addEventHandler(window.Frames.Events.CARD_VALIDATION_CHANGED, this.cardValidationChanged);
      window.Frames.addEventHandler(window.Frames.Events.CARD_TOKENIZED, event => {
        console.log(event);
        this.onCardTokenized(event);
      });
      window.Frames.addEventHandler(window.Frames.Events.PAYMENT_METHOD_CHANGED, this.paymentMethodChanged);
      this.form.addEventListener("submit", this.onSubmit);
    });
  }

  render() {
    return (
      <div className="review">
        <div className="container">
          <div className="grid">
            <div className="gcell gcell--12 gcell--def-8">
              <div className="review__content">
                <div className="review__payment">
                  <div className="summary__title">
                    <div className="summary__title-svg summary__title-svg--sm">
                      <svg width="30" height="30">
                        <use href="#wallet"></use>
                      </svg>
                    </div>
                    <div> How would you like to pay? </div>
                  </div>

                  <div className="sm-contacts__group">
                    <div className="sm-contacts__head">
                      <div className="sm-contacts__title sm-contacts__title--bold">How we use your information?</div>
                      <div className="sm-contacts__text">
                        <span>
                          Note: All the information provided by the users is protected by the GDPR and will only be used within the{" "}
                        </span>
                        <span>Terms & Conditions and Privacy Statement of Saudia Holidays.</span>
                      </div>
                    </div>

                    <div className="sm-contacts__body">
                      <div className="sm-contacts__title sm-contacts__title--md _mb-md">by Visa or MasterCard Credit Card</div>

                      <div className="sm-payment">
                        <div className="grid grid--hspace-def">
                          <div className="gcell gcell--12 gcell--md-7">
                            <div className="sm-payment__left">
                              <div className="sm-payment__card">
                                <form id="payment-form" method="POST" action="https://merchant.com/charge-card">
                                  <label htmlFor="card-number" className="form-group__label">
                                    Card number
                                  </label>
                                  <div className="input-container card-number">
                                    <div className="icon-container">
                                      {/* <img id="icon-card-number" src="images/card-icons/card.svg" alt="PAN" />
                                    <img id="icon-card-number" src="./assets/images/static-svg/correct-symbol.svg" alt="PAN" /> */}
                                    </div>
                                    <div className="card-number-frame"></div>
                                    <div className="icon-container payment-method">{/* <img id="logo-payment-method" /> */}</div>
                                    <div className="icon-container">
                                      {/* <img id="icon-card-number-error" src="images/card-icons/error.svg" /> */}
                                    </div>
                                  </div>

                                  <div className="date-and-code">
                                    <div>
                                      <label htmlFor="expiry-date">Expiry date</label>
                                      <div className="input-container expiry-date">
                                        <div className="icon-container">
                                          {/* <img id="icon-expiry-date" src="images/card-icons/exp-date.svg" alt="Expiry date" /> */}
                                        </div>
                                        <div className="expiry-date-frame"></div>
                                        <div className="icon-container">
                                          {/* <img id="icon-expiry-date-error" src="images/card-icons/error.svg" /> */}
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <label htmlFor="cvv">Security code</label>
                                      <div className="input-container cvv">
                                        <div className="icon-container">
                                          {/* <img id="icon-cvv" src="images/card-icons/cvv.svg" alt="CVV" /> */}
                                        </div>
                                        <div className="cvv-frame"></div>
                                        <div className="icon-container">
                                          {/* <img id="icon-cvv-error" src="images/card-icons/error.svg" /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  {/* <button id="pay-button" disabled="">
                                  PAY GBP 25.00
                                </button> */}

                                  <div>
                                    <span className="error-message error-message__card-number"></span>
                                    <span className="error-message error-message__expiry-date"></span>
                                    <span className="error-message error-message__cvv"></span>
                                  </div>

                                  <p className="success-payment-message"></p>
                                </form>
                              </div>

                              {/* <div className="sm-payment__holder">
                                <div className="form-group">
                                  <span className="form-group__label" htmlFor="card-holder">
                                    Cardholder Name
                                  </span>
                                  <div className="form-group__wrap">
                                    <input
                                      type="text"
                                      className="form-group__input"
                                      value=""
                                      placeholder="Enter Cardholder Name"
                                      name="card-holder"
                                      id="card-holder"
                                    />
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                          <div className="gcell gcell--12 gcell--md-5">
                            <div className="sm-payment__right">
                              <div className="sm-payment__images">
                                <div className="sm-payment__img">
                                  <img src="./assets/images/payment/visa.png" alt="" />
                                </div>
                                <div className="sm-payment__img">
                                  <img src="./assets/images/payment/verified-by-visa.png" alt="" />
                                </div>
                                <div className="sm-payment__img">
                                  <img src="./assets/images/payment/mastercard.png" alt="" />
                                </div>
                                <div className="sm-payment__img">
                                  <img src="./assets/images/payment/securecode.png" alt="" />
                                </div>
                              </div>
                              <div className="sm-payment__icon">
                                <svg width="43" height="43">
                                  <use href="#shield"></use>
                                </svg>
                              </div>
                              <div className="sm-contacts__text">
                                We use secure transmission and encrypted storage to protect your personal information.
                              </div>
                              {/* <div className="sm-payment__validate">
                                <button type="button" className="button button--full-width">
                                  Validate my credit card
                                </button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="gcell gcell--12 gcell--def-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  generateLogos = () => {
    let logos = {};

    logos["card-number"] = {
      src: "card",
      alt: "card number logo"
    };
    logos["expiry-date"] = {
      src: "exp-date",
      alt: "expiry date logo"
    };
    logos["cvv"] = {
      src: "cvv",
      alt: "cvv logo"
    };
    return logos;
  };

  onValidationChanged = event => {
    var e = event.element;

    if (event.isValid || event.isEmpty) {
      if (e == "card-number" && !event.isEmpty) {
        this.showPaymentMethodIcon();
      }
      this.setDefaultIcon(e);
      this.clearErrorIcon(e);
      this.clearErrorMessage(e);
    } else {
      if (e == "card-number") {
        this.clearPaymentMethodIcon();
      }
      this.setDefaultErrorIcon(e);
      this.setErrorIcon(e);
      this.setErrorMessage(e);
    }
  };

  clearErrorMessage = el => {
    var selector = ".error-message__" + el;
    var message = document.querySelector(selector);
    message.textContent = "";
  };

  clearErrorIcon = el => {
    var logo = document.getElementById("icon-" + el + "-error");
    logo.style.removeProperty("display");
  };

  showPaymentMethodIcon = (parent, pm) => {
    if (parent) parent.classList.add("show");

    var logo = document.getElementById("logo-payment-method");
    if (pm) {
      var name = pm.toLowerCase();
      logo.setAttribute("src", "images/card-icons/" + name + ".svg");
      logo.setAttribute("alt", pm || "payment method");
    }
    logo.style.removeProperty("display");
  };

  clearPaymentMethodIcon = parent => {
    if (parent) parent.classList.remove("show");

    var logo = document.getElementById("logo-payment-method");
    logo.style.setProperty("display", "none");
  };

  setErrorMessage = el => {
    var selector = ".error-message__" + el;
    var message = document.querySelector(selector);
    message.textContent = this.errors[el];
  };

  setDefaultIcon = el => {
    var selector = "icon-" + el;
    var logo = document.getElementById(selector);
    logo.setAttribute("src", "images/card-icons/" + this.logos[el].src + ".svg");
    logo.setAttribute("alt", this.logos[el].alt);
  };

  setDefaultErrorIcon = el => {
    var selector = "icon-" + el;
    var logo = document.getElementById(selector);
    logo.setAttribute("src", "images/card-icons/" + this.logos[el].src + "-error.svg");
    logo.setAttribute("alt", this.logos[el].alt);
  };

  setErrorIcon = el => {
    var logo = document.getElementById("icon-" + el + "-error");
    logo.style.setProperty("display", "block");
  };

  cardValidationChanged = event => {
    this.payButton.disabled = !window.Frames.isCardValid();
  };

  onCardTokenized = event => {
    const { token } = event;
    console.log("done => ", token);
    // this.props.payAndComplete({ cardToken: token });
    // var el = document.querySelector(".success-payment-message");
    // el.innerHTML = "Card tokenization completed<br>" + 'Your card token is: <span className="token">' + token + "</span>";
  };

  paymentMethodChanged = event => {
    var pm = event.paymentMethod;
    let container = document.querySelector(".icon-container.payment-method");

    if (!pm) {
      this.clearPaymentMethodIcon(container);
    } else {
      this.clearErrorIcon("card-number");
      this.showPaymentMethodIcon(container, pm);
    }
  };

  onSubmit = event => {
    event.preventDefault();
    window.Frames.submitCard();
  };
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // ...PaymentActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
