import React from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import hijriDate from "hijrah-date";
import { Trans, DateFormat } from "@lingui/macro";

const renderDay = day => {
  //debugger;
  const date = day.getDate();
  const hijDate = new hijriDate(day);
  const d = hijDate.getDate();

  return (
    <div className="DayPicker-Day-Content">
      <span>{date}</span>
      <small>{d}</small>
    </div>
  );
};
const Today = ({ geog, hijri, onTodayClick, ...props }) => {
  if (!geog || !hijri) return;
  const hijriString = hijri.format("MMMM dd, yyyy");
  return (
    <div className="today">
      <p className="_color-dark" onClick={onTodayClick}>
        <Trans id="today">
          Today
          </Trans>:{" "}
        <DateFormat
          value={geog}
          format={{
            year: "numeric",
            month: "long",
            day: "numeric"
          }}
        />

      </p>
      <p className="_color-main" onClick={onTodayClick}>
        <Trans id="hijri"> Hijri </Trans>: {hijriString}
      </p>
    </div>
  );
};
class MonoCalendar extends React.PureComponent {
  state = {
    selectedMonth: new Date(),
    todayGeog: new Date(),
    todayHijri: new hijriDate(new Date())
  };

  handleDayClick = day => {
    if (day < new Date()) return;
    const { setDate, closeDropdown } = this.props;
    setDate && setDate(+day);
    closeDropdown && closeDropdown();
  };

  gotoToday = () => {
    this.setState({ selectedMonth: new Date() });
  };

  render() {
    const { selectedMonth, todayGeog, todayHijri } = this.state;
    const { selectedDate } = this.props;
    const date = new Date(selectedDate);
    const modifiers = { start: date };
    const today = new Date();

    return (
      <React.Fragment>
        <DayPicker
          {...this.props}
          selectedDays={[date]}
          modifiers={modifiers}
          className="Selectable"
          onDayClick={this.handleDayClick}
          renderDay={renderDay}
          disabledDays={day => day < today}
          fromMonth={today}
          month={selectedMonth}
        />
        <Today geog={todayGeog} hijri={todayHijri} onTodayClick={this.gotoToday} />

      </React.Fragment>
    );
  }
}

export default MonoCalendar;
