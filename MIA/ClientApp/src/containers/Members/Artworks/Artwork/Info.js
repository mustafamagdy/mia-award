import React, { useState } from "react";
import Chips from "react-chips";
import { useForm } from "react-hook-form";
import classNames from "classnames";

const Info = ({ active, register, submitInfo, ...props }) => {
  return (
    <div className={classNames("tab_content tab_info", { active })}>
      <form onSubmit={submitInfo}>
        <div className="form_group">
          <label htmlFor="title.ar">Title (Arabic)</label>
          <input ref={register} type="text" name="title.ar" placeholder="show title" />
        </div>
        <div className="form_group">
          <label htmlFor="title.en">Title (English)</label>
          <input ref={register} type="text" name="title.en" placeholder="show title" />
        </div>
        <div className="form_group">
          <label htmlFor="about">About the show</label>
          <textarea ref={register} name="about" id="" cols="30" rows="10"></textarea>
        </div>
        {/* <div className="form_group">
          <select ref={register} name="year" id="">
            <option value="">year</option>
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
          <select ref={register} name="country" id="">
            <option value="">Country</option>
            <option value="">Country</option>
            <option value="">Country</option>
            <option value="">Country</option>
            <option value="">Country</option>
          </select>
        </div> */}

        <div className="item_col_3">
          <div className="col">
            <div className="form_group">
              <label htmlFor="directors">directors</label>
              <input ref={register} type="text" name="directors" />
              {/* <Chips ref={register} onChange={a => setValue("directors", a)} name="directors" /> */}
            </div>
            <div className="form_group">
              <label htmlFor="story">Story</label>
              <input ref={register} type="text" name="story" />
            </div>
            <div className="form_group">
              <label htmlFor="crew">Crew</label>
              <input ref={register} type="text" name="crew" />
            </div>
          </div>
          <div className="col">
            <div className="form_group">
              <label htmlFor="producers">Production</label>
              <input ref={register} type="text" name="producers" />
            </div>
            <div className="form_group">
              <label htmlFor="stars">Stars</label>
              <input ref={register} type="text" name="stars" />
            </div>
          </div>
          <div className="col">
            <div className="form_group">
              <label htmlFor="writers">writer</label>
              <input ref={register} type="text" name="writers" />
            </div>
          </div>
        </div>
        <div className="next_step">
          <button type="submit">GO TO PAYMENT</button>
        </div>
      </form>
    </div>
  );
};
export default Info;
