import React from "react";
import { Trans } from "@lingui/react";
import { withRouter } from "react-router-dom";

const ManageMyBooking = ({ ...props }) => {
  return (
    <span className="hd-login__manage-booking hd-manage-booking" onClick={() => props.history.push("/manage-booking")}>
      <Trans id="manage_my_booking">Manage My Booking</Trans>
    </span>
  );
};

export default withRouter(ManageMyBooking);
