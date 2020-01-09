import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class Video2 extends Component {
  render() {
    return <ReactPlayer url="http://localhost:62912/api/video/play/mp4/sample" playing />;
  }
}
