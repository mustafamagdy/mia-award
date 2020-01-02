import React from "react";
import DayPickerInput, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import hijriDate from "hijrah-date";
import { Trans, DateFormat } from "@lingui/macro";
import DayPicker from "react-day-picker";
import { DropdownList } from "components/Forms";

const renderDay = day => {
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

const currentYear = new Date().getFullYear();
const fromMonth = new Date(1950, 0);
const toMonth = new Date(currentYear + 10, 11);

class YearMonthForm extends React.Component {
  state = {
    year: "", //new Date().getFullYear(),
    month: "" //new Date().getMonth()
  };
  componentDidMount() {
    // const { date, year, month } = this.props;
    // console.log("componentDidMount + date", date);
    // this.setState({ year: year, month: month });
  }
  handleChange = (e, type) => {
    const { onChange } = this.props;
    let { year, month } = this.state;

    // if (type == "year") {
    //   year = e.target.value;
    //   this.setState({ year: e.target.value });
    // }
    // else {
    //   month = e.target.value;
    //   this.setState({ month: e.target.value });
    // }
    // console.log("handleChange + Month", month);
    // console.log("handleChange + Year", year);
    // onChange(new Date(year, month));
  };

  render() {
    const months = this.props.localeUtils.getMonths();
    const { onChange, selectedMonth } = this.props;
    // const { year, month } = this.state;
    const years = [];
    for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
      years.push(i);
    }
    return (
      <div className="DayPicker-Caption" >
        <div className="DayPicker-Dropdowns">
        <DropdownList
          initialValue={`${selectedMonth.toLocaleString("en", { month: "long"  })}`}
          render={({ dropdownOpen, selectedOption }, toggleDropdown, setSelected) => (
            <div className={`DayPicker-Dropdown DayPicker-Dropdown--month ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
              <div className="DayPicker-Dropdown__text"> <span> {selectedOption} </span> </div>
              <div className="DayPicker-DropItem">
                <div className="DayPicker-DropItem__list">
                  {months && months.map((month, i) => (
                    <div 
                      className="DayPicker-DropItem__item active" 
                      key={month} 
                      value={i} 
                      onClick={ e => {                        
                        setSelected(e);
                        onChange(i, 'month');
                      }}
                    >
                      {month}
                    </div> 
                  ))}
                </div>
              </div>
            </div>
          )}
        />

        <DropdownList
          initialValue={`${selectedMonth.toLocaleString("en", { year: "numeric"  })}`}
          render={({ dropdownOpen, selectedOption }, toggleDropdown, setSelected) => (
            <div className={`DayPicker-Dropdown DayPicker-Dropdown--year ${dropdownOpen ? 'open' : ''}`} onClick={toggleDropdown}>
              <div className="DayPicker-Dropdown__text"> <span> {selectedOption} </span> </div>
              <div className="DayPicker-DropItem">
                <div className="DayPicker-DropItem__list">
                  {years && years.map((year, i) => (
                    <div 
                      className="DayPicker-DropItem__item active" 
                      key={i}
                      value={year} 
                      onClick={ e => {
                        setSelected(e);
                        onChange(year, 'year');
                      }}
                    >
                      {year}
                    </div> 
                  ))}
                </div>
              </div>
            </div>
          )}
        />
        </div>
      </div>
    );
  }
}

class RegularCalendar extends React.PureComponent {
  state = {
    selectedMonth: new Date(),
    todayGeog: new Date(),
    todayHijri: new hijriDate(new Date())
  };
  constructor(props) {
    super(props);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
  }

  handleYearMonthChange(value, type) {    
    const { selectedMonth } = this.state;
    if (type === "year") {
      this.setState({ selectedMonth: new Date(value, selectedMonth.getMonth())})
    }
    else {
      this.setState({ selectedMonth: new Date(selectedMonth.getFullYear(), value)})
    }
    // this.setState({ selectedMonth: month });
  }

  handleDayClick = day => {
    const {
      setDate,
      closeDropdown,
      enableDaysAfterToday,
      enableDaysBeforeToday
    } = this.props;
    if (day > new Date() && enableDaysAfterToday === false) return;
    if (day < new Date() && enableDaysBeforeToday === false) return;
    else setDate && setDate(+day);
    closeDropdown && closeDropdown();
  };

  render() {
    const { selectedMonth } = this.state;
    const { selectedDate, allowYears } = this.props;
    const date = new Date(selectedDate);
    const modifiers = { start: date };
    return (
      <React.Fragment>
        {allowYears ? (
          <DayPicker
            selectedDays={[date]}
            modifiers={modifiers}
            renderDay={renderDay}
            className="Selectable"
            onDayClick={day => this.handleDayClick(day)}
            month={selectedMonth}
            captionElement={({ date, localeUtils }) => (
              <YearMonthForm
                date={this.state.selectedMonth}
                year={this.state.selectedMonth.getFullYear()}
                month={this.state.selectedMonth.getMonth()}
                selectedMonth={selectedMonth}
                localeUtils={localeUtils}
                onChange={this.handleYearMonthChange}
              />
            )}
          />
        ) : (
            <DayPicker
              selectedDays={[date]}
              modifiers={modifiers}
              renderDay={renderDay}
              className="Selectable"
              onDayClick={day => this.handleDayClick(day)}
              month={selectedMonth}
            />
          )}
      </React.Fragment>
    );
  }
}

export default RegularCalendar;
