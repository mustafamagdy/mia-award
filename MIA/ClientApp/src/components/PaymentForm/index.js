import React from "react";
import "./style.scss";
import config from "config";

class PaymentForm extends React.Component {
  state = {
    cardHolderName: ""
  };

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
      window.Frames.init({
        publicKey: config.paymentPublicKey,
        style: {
          base: {
            width: "100%",
            height: "40px",
            border: "none",
            background: "transparent",
            "font-size": "16px",
            "font-family": "Montserrat_Medium",
            "border-bottom": "1px solid #e2c764",
            margin: "0 auto 10px",
            color: "#ffffff"
            // [dir="rtl"] & {
            //   font-family: Tajawal_Medium;
            // } /* rtl */
          }
        }
      });

      this.logos = this.generateLogos();
      this.errors = {
        "card-number": "Please enter a valid card number",
        "expiry-date": "Please enter a valid expiry date",
        cvv: "Please enter a valid cvv code"
      };

      window.Frames.addEventHandler(window.Frames.Events.FRAME_VALIDATION_CHANGED, this.onValidationChanged);
      window.Frames.addEventHandler(window.Frames.Events.CARD_VALIDATION_CHANGED, this.cardValidationChanged);
      window.Frames.addEventHandler(window.Frames.Events.CARD_TOKENIZED, event => {
        this.onCardTokenized(event);
      });
      window.Frames.addEventHandler(window.Frames.Events.PAYMENT_METHOD_CHANGED, this.paymentMethodChanged);
      this.form.addEventListener("submit", this.onSubmit);
    });
  }

  render() {
    return (
      <form id="payment-form" method="POST" action="https://merchant.com/charge-card">
        <div className="card-number-frame"></div>
        <input
          autoCorrect="off"
          autoComplete="hidden"
          autoCapitalize="off"
          type="text"
          className="card-holdername field"
          value={this.state.cardHolderName}
          onChange={e => this.setState({ cardHolderName: e.target.value })}
          placeholder="Cardholder Name"
          name="card-holder"
          id="card-holder"
          required
        />
        <div className="expiry-date-frame"></div>
        <div className="cvv-frame"></div>
        <p className="success-payment-message"></p>
      </form>
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
    document.getElementById("pay-button").attributes["disabled"] = "";
    const { token } = event;
    this.props.cardTokenized && this.props.cardTokenized(event);
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
    window.Frames.cardholder = {
      name: this.state.cardHolderName
    };

    event.preventDefault();
    try {
      window.Frames.submitCard();
    } catch (err) {
      console.log("error complete payment", err);
    }
  };
}

export default PaymentForm;
