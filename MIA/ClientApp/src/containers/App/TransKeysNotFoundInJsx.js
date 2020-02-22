import React from "react";
import { Trans } from "@lingui/macro";

class TransKeysNotFoundInJsx extends React.Component {
  render() {
    return (
      <div style={{ display: "none" }}>
        <Trans id="general"></Trans>
        <Trans id="booths"></Trans>
        <Trans id="shows"></Trans>
      </div>
    );
  }
}

export default TransKeysNotFoundInJsx;
