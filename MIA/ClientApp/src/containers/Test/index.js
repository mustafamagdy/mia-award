import React from "react";
import PaymentForm from "components/PaymentForm";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import bookingActions from "store/reservation/actions";

import "./Style.scss";
class Test extends React.PureComponent {
  render() {
    return (
      <div className="section catalog">
        <PaymentForm
          cardTokenized={data => {
            this.props.testPay(data);
            console.log(data);
          }}
        />
        <button id="pay-button" type="submit" form="payment-form" className="button">
          Pay
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ ...bookingActions }, dispatch);
export default connect(null, mapDispatchToProps)(Test);
