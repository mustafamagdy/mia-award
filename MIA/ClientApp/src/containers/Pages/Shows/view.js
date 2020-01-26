import React from "react";

const ShowsView = props => (
  <section id="show_inner">
    <div class="show_inner_one">
      <div class="container">
        <div class="show_info">
          <div class="show_details">
            <div class="imgthumb">
              <img src="/assets/images/show_image.png" alt="#" />
              <div class="mask">
                <span>The blue elephant</span>
              </div>
            </div>
            <div class="desc">
              <div class="name">The blue elephant</div>
              <div class="stars">
                <i class="icofont-ui-rating"></i>
                <i class="icofont-ui-rating"></i>
                <i class="icofont-ui-rating"></i>
                <i class="icofont-ui-rate-blank"></i>
                <i class="icofont-ui-rate-blank"></i>
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
          <div class="about_show">
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
        <div class="show_video_show">
          <a href="#" title="#">
            <img src="/assets/images/show_inner_image.png" alt="#" />
          </a>
        </div>
      </div>
    </div>
    <div class="show_inner_two">
      <div class="container">
        <div class="show_video">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/zAGVQLHvwOY"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div class="show_content">
          <div class="tabs_area">
            <div class="tabs">
              <ul>
                <li>info</li>
                <li class="active">Show</li>
                <li>Review</li>
              </ul>
            </div>
            <div class="all_tabs_content">
              <div class="item_tabs_content">
                <div class="choose_season">
                  <button type="button">season 1</button>
                  <ul>
                    <li>season 2</li>
                    <li>season 3</li>
                    <li>season 4</li>
                    <li>season 5</li>
                  </ul>
                </div>
                <div class="info_show">
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
                      <div class="crew_content">
                        <div class="title">Cast</div>
                        <div class="content">
                          Joaquin Phoenix <br />
                          Robert De Niro <br />
                          Zazie Beetz
                        </div>
                        <div class="title">D.O.P</div>
                        <div class="content">
                          Joaquin Phoenix <br />
                          Robert De Niro <br />
                          Zazie Beetz
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="item_tabs_content active">
                <div class="item_show">
                  <div class="title">
                    SEASONS <span>( 03 )</span>
                  </div>
                  <ul>
                    <li>
                      <div class="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 1</p>
                      <div class="stars">
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rate-blank"></i>
                        <i class="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                    <li>
                      <div class="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 2</p>
                      <div class="stars">
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rate-blank"></i>
                        <i class="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                    <li>
                      <div class="imgthumb">
                        <img src="/assets/images/show_inner_image.png" alt="#" />
                      </div>
                      <p>season 3</p>
                      <div class="stars">
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rating"></i>
                        <i class="icofont-ui-rate-blank"></i>
                        <i class="icofont-ui-rate-blank"></i>
                      </div>
                    </li>
                  </ul>
                  <div class="season_content">sdsdsd</div>
                </div>
              </div>
              <div class="item_tabs_content">Review Review Review</div>
            </div>
          </div>
          <div class="side_bar">
            <div class="small_banner">
              <a href="#" title="#">
                <img src="/assets/images/small_banner.png" alt="#" />
              </a>
            </div>
            <div class="big_banner">
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
