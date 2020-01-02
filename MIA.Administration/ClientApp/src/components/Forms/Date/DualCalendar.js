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

const SelectedDateRange = ({ from, to }) => (
  <p>
    {!from && !to && <Trans id="please_select_checkin_date">Please select checkin day.</Trans>}
    {from && !to && <Trans id="please_select_checkout_date">Please select checkout day.</Trans>}
    {from && to && `From ${from.toDateString()} to ${to.toDateString()}`}
  </p>
);
const Holidays = ({ holiday }) => <p className="_color-main">{holiday}</p>;

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

class DualCalendar extends React.PureComponent {
  static defaultProps = {
    numberOfMonths: window.screen.width < 480 ? 1 : 2
  };

  state = {
    holiday: undefined, //"9 May ‘’Name of a religious holiday’’ 14:40"
    isFirstClick: true,
    todayGeog: new Date(),
    todayHijri: new hijriDate(new Date()),
    selectedMonth: new Date()
  };

  handleDayMouseEnter = day => {
    let _range = {
      from: this.props.from,
      to: undefined
    };
    const { from: _from, to: _to } = _range;
    const from = new Date(_from);
    const to = new Date(_to);
    DateUtils.addDayToRange(day, { from, to });
  };

  handleDayMouseLeave = day => { };

  handleDayClick = day => {
    if (day < new Date()) return;
    const { isFirstClick } = this.state;
    const { from: _from, to: _to, setDates, closeDropdown } = this.props;
    const from = new Date(_from);
    const to = new Date(_to);

    if (isFirstClick) {
      this.setState({ isFirstClick: false });
      if (day.getMonth() > new Date().getMonth()) {
        this.setState({ selectedMonth: day });
      } else {
        this.setState({ selectedMonth: new Date() });
      }
      setDates && setDates({ checkInDate: +day, checkOutDate: undefined });
    } else {
      this.setState({ isFirstClick: true });
      let range = DateUtils.addDayToRange(day, { from, to });
      if (!range.from || !range.to) {
        range = { from, to };
      }
      let newRange = { checkInDate: +range.from, checkOutDate: +range.to };

      if (day < from)
        newRange = { checkInDate: new Date(day).getTime(), checkOutDate: new Date(from).getTime() };

      setDates && setDates(newRange);
      closeDropdown && closeDropdown();
    }
  };

  gotoToday = () => {
    this.setState({ selectedMonth: new Date() });
  };

  render() {
    const { holiday, todayGeog, todayHijri, selectedMonth, initialCheckInDate } = this.state;
    const { from: _from, to: _to } = this.props;
    const from = new Date(_from);
    const to = new Date(_to);

    const modifiers = { start: from, end: to };
    const today = new Date();
    const disabledDays =
      initialCheckInDate && initialCheckInDate !== undefined ? [{ before: new Date(initialCheckInDate) }] : [{ before: new Date(to) }];

    // console.log(initialCheckInDate);

    return (
      <React.Fragment>
        <DayPicker
          {...this.props}
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          className="Selectable"
          onDayClick={this.handleDayClick}
          renderDay={renderDay}
          onDayMouseEnter={this.handleDayMouseEnter}
          onDayMouseLeave={this.handleDayMouseLeave}
          disabledDays={disabledDays}
          fromMonth={today}
          month={selectedMonth}
          dateFormat="MM-DD-YYYY"
        />
        <Today geog={todayGeog} hijri={todayHijri} onTodayClick={this.gotoToday} />
        <SelectedDateRange from={from} to={to} />
        <Holidays holiday={holiday} />
      </React.Fragment>
    );
  }
}

export default DualCalendar;
