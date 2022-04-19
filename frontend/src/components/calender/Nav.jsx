import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { customSelectStyles, timeframeOptions } from '../../constance/localData';


const Nav = ({dateControl, setDateControl, startDate, setStartDate, fromDate, toDate, setfromDate, setToDate}) => {
    const [zoom, setZoom] = useState('0.75');
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const businessesSelect = company.businesses.map(business => {
        return {
            value: business._id,
            label: business.name
        }
    });

    function getPreviousMonday(date = new Date()) {
        const previousMonday = new Date();
        
        previousMonday.setMonth(startDate.getMonth(), date.getDate() - ((date.getDay() + 6) % 7));
        
        return previousMonday;
    }

    // get rande of dates from previous monday to sunday
    function getRange(date = new Date()) {
        const previousMonday = new Date();
        
        if(dateControl.value === 'week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7)) + 6);
        } else if(dateControl.value === '2week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7) + 13));
        } else if(dateControl.value === '4week') {
            previousMonday.setMonth(startDate.getMonth(), (date.getDate() - ((date.getDay() + 6) % 7) + 27));
        }
        
        return previousMonday;
    }

    // handle click on button for next or previous day, week, 2 week or month
    function handleNextPrev(value) {
        if(value === 'next') {
    
            if(dateControl.value === 'day') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() + 1)));
            } else {
            setStartDate(new Date(startDate.setMonth(toDate.getMonth(), toDate.getDate() + 1)));
            }
    
        } else if(value === 'prev') {
    
            if(dateControl.value === 'day') {
            setStartDate(new Date(startDate.setDate(startDate.getDate() - 1)));
            } else {
            setStartDate(new Date(startDate.setMonth(fromDate.getMonth(), fromDate.getDate() - 1)));
            }
    
        }
    }

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="date btn example-custom-input" onClick={onClick} ref={ref}>
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

    useEffect(() => {
        if (id && fromDate) {
            const  data = {
                business: id,
                fromDate: fromDate,
                toDate: toDate
            }
            dispatch(getAllBusinessShifts(data));
        }
    }, [fromDate, id])

    const onChangeZoom = (e) => {
        const calenderBody = document.querySelector('.calender-body');
        calenderBody.style.zoom = e.target.value;
        setZoom(e.target.value);
    }

    return (
        <>
        {fromDate && (
        <>
        <div className="calender-header">
            <div className="flex align-between">
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
                    <div className="btn">
                        Copy This Schedule 
                    </div>
                </div>
            </div>
            <div className="flex align-between">
                <div className="calender-header-left">
                    <div className="date-control btn-group box-shadow">
                        <div 
                            className="prev-date btn" 
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
                            className="next-date btn" 
                            onClick={() => { handleNextPrev('next') }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                            </svg>
                        </div>
                    </div>
                    <div className="today-control">
                        <div 
                            className="today btn" 
                            onClick={() => { setStartDate(new Date) }}
                        >
                            TODAY
                        </div>
                    </div>
                </div>
                <div className="calender-header-right">
                    <div className="select-control">
                        <Select
                            value={dateControl}
                            onChange={(e) => {setDateControl(e); setStartDate(new Date);}}
                            isSearchable={false}
                            options={timeframeOptions}
                            styles={customSelectStyles}
                            
                        />
                    </div>
                    <div className="business-control">
                        <Select
                            value={{value: id, label: company.businesses.filter(business => business._id === id)[0].name}}
                            onChange={(e) => {navigate(`/scheduler/${e.value}`)}}
                            isSearchable={false}
                            options={businessesSelect}
                            styles={customSelectStyles}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="zoom-calender">
            <div className="zoom-calender-handler" title="Zoom in/out">
                <input type="range" min="0.25" max="1" step="0.05" value={zoom} onChange={onChangeZoom}/>
            </div>
        </div>
        </>
        )}
        </>
    )
}

export default Nav