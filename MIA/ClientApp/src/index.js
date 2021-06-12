import "core-js/stable";
import "regenerator-runtime/runtime";
import "sanitize.css/sanitize.css";

import React from "react";
import ReactDOM from "react-dom";

import App from "containers/App";

// Load the favicon and the .htaccess file
// import "!file-loader?name=[name].[ext]!./images/favicon.ico";
// import "file-loader?name=.htaccess!./.htaccess"; // eslint-disable-line import/extensions

import "react-day-picker/lib/style.css";
import "./index.css";

const MOUNT_NODE = document.getElementById("app");

const render = messages => {
  ReactDOM.render(<App />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["containers/App"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

//Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  }) // eslint-disable-line prettier/prettier
    .then(() => render())
    .catch(err => {
      throw err;
    });
} else {
  render();
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV !== "development") {
  require("offline-plugin/runtime").install(); // eslint-disable-line global-require
}
