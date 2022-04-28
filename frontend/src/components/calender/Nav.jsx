import { useState, forwardRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import { getAllBusinessShifts } from '../../features/shift/shiftSlice';
import { customSelectStyles, timeframeOptions } from '../../constance/localData';
import { CopyShifts, ManagerProtect } from '../';
import { arrowLeftIcon, arrowRightIcon, calenderRangeIcon } from '../../constance/icons';


const Nav = ({dateControl, setDateControl, startDate, setStartDate, fromDate, toDate, setfromDate, setToDate}) => {
    const [zoom, setZoom] = useState('1');
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
        <div className="date btn btn-outline example-custom-input" onClick={onClick} ref={ref}>
            {calenderRangeIcon}
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
                fromDate: dateControl.value === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())
                        : fromDate,
                toDate: dateControl.value === 'day' 
                    ? new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()+1)
                        : toDate,
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
                    <div className="date title-1 p-0">
                        {dateControl.label === 'Day' ?
                        
                            startDate.toLocaleString("en-US", { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
                        :(
                            fromDate.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ' - ' +
                            toDate.toLocaleString("en-US", { month: 'short', day: 'numeric' }) + ', ' +
                            fromDate.toLocaleString("en-US", { year: 'numeric' }) 
                        )}
                    </div>
                </div>
                <ManagerProtect>
                    <CopyShifts 
                        fromDate={fromDate}
                        toDate={toDate}
                        startDate={startDate}
                        dateControl={dateControl}
                    />
                </ManagerProtect>
            </div>
            <div className="flex align-between">
                <div className="calender-header-left">
                    <div className="date-control btn-group btn-group-outline box-shadow">
                        <div 
                            className="prev-date btn btn-outline" 
                            onClick={() => { handleNextPrev('prev') }}
                        >
                            {arrowLeftIcon}
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
                            {arrowRightIcon}
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