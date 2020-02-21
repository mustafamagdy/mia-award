import React from "react";

const Files = props => (
  <div className="tab_content tab_upload_videos">
    <div className="uploads_area">
      <div className="top_upload">
        {/* <div className="selection">
          <select name="" id="">
            <option value="" selected>
              Season 1
            </option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
            <option value="">Season</option>
          </select>
          <select name="" id="">
            <option value="" selected>
              Episodes
            </option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
            <option value="">Episodes</option>
          </select>
        </div> */}
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </div>
      <div className="bottom_upload">
        <div className="upload_input">
          <form action="#">
            <input type="file" />
            <div className="upload_now">
              <i className="icofont-upload-alt"></i>
              <p>Drag files to upload</p>
            </div>
            <span>Choose Files</span>
          </form>
        </div>
        <div className="upload_list">
          <div className="title">Files Upload</div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "10%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "20%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "30%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "40%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "50%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "60%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "70%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
          <div className="item">
            <div className="name">
              <span>Episode 1</span>
              <p>95.8 mb</p>
            </div>
            <div className="bar_area">
              <div className="progress_bar">
                <div className="progress_inside" style={{ width: "80%" }}></div>
              </div>
              <div className="play">
                <i className="icofont-ui-play"></i>
              </div>
              <div className="cancel">
                <i className="icofont-close"></i>
              </div>
            </div>
            <div className="progress_number">
              Uploading <p>20%</p> done
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Files;
