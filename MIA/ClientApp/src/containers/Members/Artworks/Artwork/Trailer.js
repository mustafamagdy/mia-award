import React from "react";

const Trailer = props => (
  <div className="tab_content tab_trailer">
    <div className="trailer_area">
      <div className="next_step">
        <span>Next</span>
      </div>
      <div className="upload_trailer">
        <form action="#">
          <input type="file" />
          <i className="icofont-plus"></i>
          <span>Upload your trailer</span>
        </form>
      </div>
    </div>
  </div>
);

export default Trailer;
