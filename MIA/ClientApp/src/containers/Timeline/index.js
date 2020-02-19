import React from "react";
import classNames from "classnames";
import { useState } from "react";
const Timeline = props => {
  const timeline = [
    {
      id: "1",
      day: "day 1 20-05-2020",
      events: [
        {
          id: 1,
          time: "11:00 - 12:00",
          title: "THE FIRST SEMINAR",
          brief: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`,
          icon: "icofont-ui-calendar"
        },
        {
          id: 2,
          time: "11:00 - 12:00",
          title: "THE FIRST SEMINAR",
          brief: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`,
          icon: "icofont-ui-calendar"
        },
        {
          id: 3,
          time: "11:00 - 12:00",
          title: "THE FIRST SEMINAR",
          brief: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`,
          icon: "icofont-ui-calendar"
        }
      ]
    },
    {
      id: "2",
      day: "day 2 21-05-2020",
      events: [
        {
          id: 4,
          time: "11:00 - 12:00",
          title: "THE FIRST SEMINAR",
          brief: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`,
          icon: "icofont-ui-calendar"
        },
        {
          id: 5,
          time: "11:00 - 12:00",
          title: "THE FIRST SEMINAR",
          brief: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.`,
          icon: "icofont-ui-calendar"
        }
      ]
    }
  ];

  const [selectedDay, setSelectedDay] = useState(timeline[0]);

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
                    checked={selectedDay.id == t.id}
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

                {/* <div className="item timeleft">
                  <div className="circle">
                    <i className="icofont-ui-calendar"></i>
                  </div>
                  <time>11:00 - 12:00</time>
                  <span>The first seminar</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </p>
                </div>
                <div className="item timeright">
                  <div className="circle">
                    <i className="icofont-chart-histogram"></i>
                  </div>
                  <time>11:00 - 12:00</time>
                  <span>The first seminar</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </p>
                </div>
                <div className="item timeleft">
                  <div className="circle">
                    <i className="icofont-ui-wifi"></i>
                  </div>
                  <time>11:00 - 12:00</time>
                  <span>The first seminar</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
                  </p>
                </div>
               */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
