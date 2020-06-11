import React from "react";
import { Trans } from "@lingui/macro";

class TransKeysNotFoundInJsx extends React.Component {
  render() {
    return (
      <div style={{ display: "none" }}>
        <Trans id="general"></Trans>
        <Trans id="booths"></Trans>
        <Trans id="shows"></Trans>
        <Trans id="any_year"></Trans>

        <Trans id="location1_title"></Trans>
        <Trans id="location1_description"></Trans>
        <Trans id="location2_title"></Trans>
        <Trans id="location2_description"></Trans>

        <Trans id="slide1_title"></Trans>
        <Trans id="slide1_text"></Trans>
        <Trans id="slide2_title"></Trans>
        <Trans id="slide2_text"></Trans>
        <Trans id="slide3_title"></Trans>
        <Trans id="slide3_text"></Trans>
        <Trans id="slide4_title"></Trans>
        <Trans id="slide4_text"></Trans>

      </div>
    );
  }
}

export default TransKeysNotFoundInJsx;
