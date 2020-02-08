import React, { useState } from "react";
import Chips from "react-chips";
import { useForm } from "react-hook-form";

const Info = ({register, handleSubmit, ...props}) => {
  // const [directors, setDirectors] = useState([]);
  // const [producers, setProducers] = useState([]);
  // const [writers, setWriters] = useState([]);
  // const [stars, setStars] = useState([]);
  // const [crew, setCrew] = useState([]);

  

  return (
    <div className="tab_content tab_info">
      <form action="#">
        <div className="form_group">
          <label for="title.ar">Title (Arabic)</label>
          <input ref={register} type="text" name="title.ar" placeholder="show title" />
        </div>
        <div className="form_group">
          <label for="title.en">Title (English)</label>
          <input ref={register} type="text" name="title.en" placeholder="show title" />
        </div>
        <div className="form_group">
          <label for="about">About the show</label>
          <textarea name="about" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="form_group">
          <select name="year" id="">
            <option value="" selected>
              year
            </option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
            <option value="">2021</option>
          </select>
        </div>

        <div className="form_group">
          <select name="country" id="">
            <option value="" selected>
              Country
            </option>
            <option value="">Country</option>
            <option value="">Country</option>
            <option value="">Country</option>
            <option value="">Country</option>
          </select>
        </div>

        <div className="item_col_3">
          <div className="col">
            <div className="form_group">
              <label for="about">Director</label>
              <input ref={register} type="text" name="directors" />
              {/* <Chips ref={register} onChange={a => setValue("directors", a)} name="directors" /> */}
            </div>
            <div className="form_group">
              <label for="about">Story</label>
              <input ref={register} type="text" name="story" />
            </div>
            <div className="form_group">
              <label for="about">Crew</label>
              <input ref={register} type="text" name="crew" />
            </div>
          </div>
          <div className="col">
            <div className="form_group">
              <label for="about">Production</label>
              <input ref={register} type="text" name="producers" />
            </div>
            <div className="form_group">
              <label for="about">Stars</label>
              <input ref={register} type="text" name="stars" />
            </div>
          </div>
          <div className="col">
            <div className="form_group">
              <label for="about">writer</label>
              <input ref={register} type="text" name="writers" />
            </div>
          </div>
        </div>
        <div className="next_step">
          <span>GO TO PAYMENT</span>
        </div>
      </form>
    </div>
  );
};
export default Info;
