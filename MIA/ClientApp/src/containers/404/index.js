import React from "react";
import { Trans } from '@lingui/macro';

class NotFound extends React.PureComponent {
  render() {
    return (
      <div className="wrapper">
        <div className="section _flex-grow">
          <div className="section section--header">
            <div className="container">
              <div className="title title--size-h3">
                <a href="index.html"><Trans id="error_header"> Error header </Trans></a>
              </div>
            </div>
          </div>

          <div className="section _pt-def">
            <div className="container">
              <div className="title title--size-h1"><Trans id="not_found"> Not found </Trans></div>

              <div className="wysiwyg">
                <p className="_ellipsis">
                  <code id="window-location-href">&nbsp;</code>
                </p>
                <p>
                  {/* todo */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default NotFound;
