import React from "react";

const ShowsView = props => (
  <section id="show_inner">
    <div className="show_inner_one">
      <div className="container">
        <div className="show_info">
          <div className="show_details">
            <div className="imgthumb">
              <img src="/assets/images/show_image.png" alt="#" />
              <div className="mask">
                <span>The blue elephant</span>
              </div>
            </div>
            <div className="desc">
              <div className="name">The blue elephant</div>
              <div className="stars">
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rating"></i>
                <i className="icofont-ui-rate-blank"></i>
                <i className="icofont-ui-rate-blank"></i>
              </div>
              <ul>
                <li>
                  <span>Date of release :</span>
                  <p>2019</p>
                </li>
                <li>
                  <span>Category :</span>
                  <p>Movie</p>
                </li>
                <li>
                  <span>Genre :</span>
                  <p>Drama</p>
                </li>
                <li>
                  <span>Country :</span>
                  <p>USA</p>
                </li>
                <li>
                  <span>posted :</span>
                  <p>25-02-2020</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="about_show">
            <span>About the show</span>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </p>
          </div>
        </div>
        <div className="show_video_show">
          <a href="#" title="#">
            <img src="/assets/images/show_inner_image.png" alt="#" />
          </a>
        </div>
      </div>
    </div>
    <div className="show_inner_two">
      <div className="container">
        <div className="show_video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/zAGVQLHvwOY"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="show_content">
          <div className="tabs_area">
            <div className="tabs">
              <ul>
                <li>info</li>
                <li className="active">Show</li>
                <li>Review</li>
              </ul>
            </div>
            <div className="all_tabs_content">
              <div className="item_tabs_content">
                <div className="choose_season">
                  <button type="button">season 1</button>
                  <ul>
                    <li>season 2</li>
                    <li>season 3</li>
                    <li>season 4</li>
                    <li>season 5</li>
                  </ul>
                </div>
                <div className="info_show">
                  <ul>
                    <li>
                      <span>Director :</span>
                      <p>John Doe</p>
                    </li>
                    <li>
                      <span>Production :</span>
                      <p>Square Production</p>
                    </li>
                    <li>
                      <span>Writers :</span>
                      <p>Todd Phillips, Scott Silver</p>
                    </li>
                    <li>
                      <span>Story :</span>
                      <p>Scott Silver</p>
                    </li>
                    <li>
                      <span>Stars :</span>
                      <p>Joaquin Phoenix, Robert De Niro, Zazie Beetz</p>
                    </li>
                    <li>
                      <span>Crew :</span>
                      <div className="crew_content">
                        <div className="title">Cast</div>
                        <div className="content">
                          Joaquin Phoenix <br />
                          Robert De Niro <br />
                          Zazie Beetz
                        </div>
                        <div className="title">D.O.P</div>
                        <div className="content">
                          Joaquin Phoenix <br />
                          Robert De Niro <br />
                          Zazie Beetz
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="item_tabs_content active">
                <div className="item_show">
                  <div className="title">
                    SEASONS <span>( 03 )</span>
                  </div>
                  <ul>
                    <li>
                      <div className="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 1</p>
                      <div className="stars">
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rate-blank"></i>
                        <i className="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                    <li>
                      <div className="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 2</p>
                      <div className="stars">
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rate-blank"></i>
                        <i className="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                    <li>
                      <div className="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 3</p>
                      <div className="stars">
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rating"></i>
                        <i className="icofont-ui-rate-blank"></i>
                        <i className="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                  </ul>
                  <div className="season_content">sdsdsd</div>
                </div>
              </div>
              <div className="item_tabs_content">Review Review Review</div>
            </div>
          </div>
          <div className="side_bar">
            <div className="small_banner">
              <a href="#" title="#">
                <img src="/assets/images/small_banner.png" alt="#" />
              </a>
            </div>
            <div className="big_banner">
              <a href="#" title="#">
                <img src="/assets/images/big_banner.png" alt="#" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ShowsView;
