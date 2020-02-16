import React from "react";

const Profile = props => (
  <div className="profile_area">
    <div className="edit_profile">
      <div className="imgthumb">
        <img src="/assets/images/related_news_image.png" alt="#" />
      </div>
      <button type="button">Edit Profile</button>
    </div>
    <div className="profile_tabs">
      <ul>
        <li className="active">Info</li>
        <li>Awards</li>
      </ul>
      <div className="content_tab info_tab active">
        <form action="#">
          <input type="text" value="Mai Mahmoud Aly" />
          <input type="text" value="Job Title" />
          <input type="text" value="25-10-1986" />
          <input type="text" value="Address 1 , lorem lipsum, cairo, Egypt" />
        </form>
      </div>
      <div className="content_tab awards_tab">
        <div className="item">
          <div className="col-one">
            <div className="imgthumb">
              <img src="/assets/images/award.png" alt="#" />
            </div>
            <div className="txt">
              <span>movies</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </p>
            </div>
          </div>
          <div className="col-two">
            <div className="imgthumb">
              <img src="/assets/images/show_image2.png" alt="#" />
            </div>
          </div>
        </div>
        <div className="item">
          <div className="col-one">
            <div className="imgthumb">
              <img src="/assets/images/award_sport.png" alt="#" />
            </div>
            <div className="txt">
              <span>Sports</span>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book.
              </p>
            </div>
          </div>
          <div className="col-two">
            <div className="imgthumb">
              <img src="/assets/images/show_image2.png" alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Profile;
