import { useState, forwardRef, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { Scheduler } from "../";
import "react-datepicker/dist/react-datepicker.css";
import './styles/Calender.css';


const timeframeOptions = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
  { value: '2week', label: '2 Week' },
  { value: '4week', label: '4 Week' },
];

const customSelectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'var(--text-light)' : '#var(--text-dark)',
    padding: 15,
    background: state.isSelected ? 'var(--primary)' : 'var(--extra-extra-light)',
    fontWeight: state.isSelected ? '600' : 'normal',
  }),
  control: () => ({
    border: '2px solid var(--dark)',
    color: 'var(--text-dark)',
    fontWeight: '600',
    display: 'flex',
    height: '41px',
    borderRadius: 'var(--border-radius)',
    width: 200,
  }),
  indicatorSeparator: () => ({
    background: 'var(--dark)',
    height: '65%',
    width: '1px',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}


const Calender = () => {
  const [dateControl, setDateControl] = useState(timeframeOptions[0]);
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setfromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="date btn btn-outline example-custom-input" onClick={onClick} ref={ref}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
      </svg>
    </div>
  ));


  useEffect(() => {
    setfromDate(getPreviousMonday(startDate))
    setToDate(getRange(startDate))
  }, [startDate]);


  function getPreviousMonday(date = new Date()) {
    const previousMonday = new Date();
  
    previousMonday.setMonth(startDate.getMonth(), date.getDate() - date.getDay() + 1)
  
    return previousMonday;
  }

  // get rande of dates from previous monday to sunday
  function getRange(date = new Date()) {
    const previousMonday = new Date();
    
    if(dateControl.value === 'week') {
      previousMonday.setMonth(startDate.getMonth(), date.getDate() - date.getDay() + 7)
    } else if(dateControl.value === '2week') {
      previousMonday.setMonth(startDate.getMonth(), date.getDate() - date.getDay() + 14)
    } else if(dateControl.value === '4week') {
      previousMonday.setMonth(startDate.getMonth(), date.getDate() - date.getDay() + 28)
    }
  
    return previousMonday;
  }

  // handle click on button for next or previous day, week, 2 week or month
  function handleNextPrev(value) {
    if(value === 'next') {

      if(dateControl.value === 'day') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)));
      } else if(dateControl.value === 'week') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() + 7)));
      } else if(dateControl.value === '2week') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() + 14)));
      } else if(dateControl.value === '4week') {
        setStartDate(new Date(startDate.setMonth(startDate.getMonth() + 1)));
      }

    } else if(value === 'prev') {

      if(dateControl.value === 'day') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() - 1)));
      } else if(dateControl.value === 'week') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() - 7)));
      } else if(dateControl.value === '2week') {
        setStartDate(new Date(startDate.setDate(startDate.getDate() - 14)));
      } else if(dateControl.value === '4week') {
        setStartDate(new Date(startDate.setMonth(startDate.getMonth() - 1)));
      }

    }
  }


  return (
    <section>
      <div className="calender">
        <div className="calender-header">
          <div className="calender-header-left">
            <div className="date">
              {dateControl.label === 'Day' ?
              
                startDate.toLocaleString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
              :(
                fromDate.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ' - ' +
                toDate.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ', ' +
                fromDate.toLocaleString("en-US", { year: 'numeric' }) 
              )}
            </div>
          </div>
          <div className="calender-header-right">
            <div className="date-control btn-group">
              <div 
                className="prev-date btn btn-outline" 
                onClick={() => { handleNextPrev('prev') }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                </svg>
              </div>
              <DatePicker
                selected={dateControl.label === "Day" ? startDate : fromDate}
                onChange={(date) => {setStartDate(date)}}
                customInput={<ExampleCustomInput />}
                calendarStartDay={1}
                startDate={dateControl.label === "Day" ? startDate : fromDate}
                endDate={dateControl.label === "Day" ? startDate : toDate}
              />
              <div 
                className="next-date btn btn-outline" 
                onClick={() => { handleNextPrev('next') }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                </svg>
              </div>
            </div>
            <div className="today-control">
              <div 
                className="today btn btn-outline" 
                onClick={() => { setStartDate(new Date) }}
              >
                TODAY
              </div>
            </div>
            <div className="select-control">
              <Select
                value={dateControl}
                onChange={(e) => {setDateControl(e); setStartDate(new Date);}}
                isSearchable={false}
                options={timeframeOptions}
                styles={customSelectStyles}
                
              />
            </div>
            <div className="print-control">
              <div className="print btn btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                  <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                  <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <Scheduler 
          fromDate={fromDate}
          dateControl={dateControl}
          setDateControl={setDateControl}
          setStartDate={setStartDate}
        />
      </div>
    </section>
  )
}

export default Calender