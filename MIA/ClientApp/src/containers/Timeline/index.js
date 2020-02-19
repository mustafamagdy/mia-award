import React, { useEffect } from "react";
import classNames from "classnames";
import { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import homeActions from "store/home/actions";

const Timeline = ({ timeline, fetchTimeline, props }) => {
  useEffect(() => {
    fetchTimeline();
  }, []);

  useEffect(() => {
    setSelectedDay(timeline[0]);
  }, [timeline]);

  const [selectedDay, setSelectedDay] = useState(undefined);

  return (
    <section id="timeline_page">
      <div className="container">
        <div className="all_blocks_timeline">
          <div className="left_col">
            <div className="txt">
              <div className="title">Program Schedule</div>
              <p>
                brief about the DRAMA award and how to apply for it text Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
                versions of .
              </p>
              {timeline.map((t, i) => (
                <label key={i} htmlFor={t.day}>
                  <input
                    type="radio"
                    id={t.day}
                    name="eventDay"
                    checked={selectedDay && selectedDay.id == t.id}
                    value={t}
                    onChange={e => {
                      setSelectedDay(timeline[i]);
                    }}
                  />
                  <div className="checkmark"></div>
                  <span>{t.day}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="right_col">
            <div className="schedule">
              <div className="title">FIRST DAY</div>
              <div className="timeline_blocks">
                {selectedDay &&
                  selectedDay.events.map((e, i) => {
                    const left = i % 2 == 0;
                    return (
                      <div key={e.id} className={classNames("item", { timeleft: !!left }, { timeright: !left })}>
                        <div className="circle">
                          <i className={e.icon}></i>
                        </div>
                        <time>{e.time}</time>
                        <span>{e.title}</span>
                        <p>{e.brief}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = ({ home: { timeline } }) => ({ timeline });
const mapDispatchToProps = dispatch => bindActionCreators({ ...homeActions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
