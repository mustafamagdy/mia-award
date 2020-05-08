import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useForm } from "react-hook-form";

const Info = ({ details, active, saveArtworkInfo, ...props }) => {
  const years = [2017, 2018, 2019, 2020];
  const countries = ["egypt", "saudi arabia", "uae"];
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { ...details }
  });

  useEffect(() => {
    reset(details);
  }, [details]);

  const updateInfo = values => {
    saveArtworkInfo({ ...values, id: details.id });
  };

  return (
    <div className={classNames("tab_content tab_info", { active })}>
      <form onSubmit={handleSubmit(updateInfo)}>
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
          <textarea ref={register} name="about" cols="30" rows="10"></textarea>
        </div>
        <div className="form_group">
          <select ref={register} name="year">
            {years.map((y, i) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="form_group">
          <select ref={register} name="country">
            {countries.map((c, i) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="item_col_3">
          <div className="col">
            <div className="form_group">
              <label htmlFor="directors">directors</label>
              <input ref={register} type="text" name="directors" />
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
          <button type="submit">Save details</button>
        </div>
      </form>
    </div>
  );
};

export default Info;
