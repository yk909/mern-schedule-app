import { useEffect, useRef } from 'react';
import './styles/Scheduler.css';

const hours = [ '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm' ];

const Scheduler = ({fromDate, dateControl}) => {
    const calenderRef = useRef(null);
    const date = fromDate;
    const shiftRef = useRef(null);

    const onWheel = (e) => {
        // scroll left on wheel up and right on wheel down only if not on mobile view
        if (window.innerWidth > 768) {
            if (e.deltaY > 0) {
                calenderRef.current.scrollLeft += 100;
            } else {
                calenderRef.current.scrollLeft -= 100;
            }
        }
    };

    const onMouseDownResize = (e) => {
        e.preventDefault();
        const parentRef = e.target.parentElement.parentElement;
        const minStep = 70; // min box width
        const maxWidth = parentRef.parentElement.parentElement.clientWidth; // container width


        const onMouseMove = (e) => {
            let newWidth = e.pageX + 15 - parentRef.getBoundingClientRect().left; // 15 is an offset to make the width of the div to be the same as the width of the mouse pointer
            if ( newWidth >= minStep && newWidth < maxWidth + 50 - parentRef.offsetLeft ) {
                parentRef.style.width = (+(Math.round(100*(newWidth / minStep) * 10) / 100).toFixed(0) * 10) + "%";
            }
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
        };

        if (parentRef) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", onMouseUp);
        }
    };

    return (
        <div className={`calender-body${dateControl.value === 'day' ? ' day-view' : ''}`}>
            <div
                ref={calenderRef}
                onWheel={onWheel}
                className="scheduler-wrapper"
            >
                <div className="section-container">
                    <div className="section-row flex bg-x-light">
                        <div className="section-title flex">
                            <div className="section-content bg-xx-light w-100 flex align-between">
                                <div>
                                    EMPLOYEE
                                </div>
                                <div className="btn-icon" title="Add New Employee">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {[...Array(
                            dateControl.value === "week" ?
                                7 
                            : dateControl.value === "2week" ?
                                14
                            : dateControl.value === "4week" ?
                                28
                            : 24
                        ).keys()].map((i) => {
                            return (
                            <div key={i} className="col section-holder">
                                <div className="flex align-between w-100 h-100">
                                    <div 
                                        className={`shift w-100 h-100${
                                            dateControl.value !== 'day' &&
                                            new Date().getDate() === date.getDate()+i ?
                                                ' bg-success'
                                            : ' bg-light'
                                        }`}
                                    >
                                        { dateControl.value === "day" ?
                                            <div className="flex align-center w-100 h-100">
                                                { hours[i] }
                                            </div>
                                        :
                                            <div className="flex align-between w-100 h-100">
                                                <div>
                                                    { new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).toLocaleString('en-us', {  weekday: 'long' }) }
                                                </div>
                                                <div>
                                                    { new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getDate() }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                </div>
                <div className="section-container">
                    <div className="section-row bg-xx-light flex open-shift">
                        <div className="section-title">
                            <div className="section-content h-100 flex align-between bg-xx-light">
                                <div className="flex align-center">
                                    <div className="section-img">
                                    </div>
                                    <div className="section-details">
                                        <div className="section-name">
                                            Open Shift
                                        </div>
                                        <div className="section-hours">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                            80
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {[...Array(
                            dateControl.value === "week" ?
                                7 
                            : dateControl.value === "2week" ?
                                14
                            : dateControl.value === "4week" ?
                                28
                            : 24
                        ).keys()].map((i) => {
                            return (
                            <div key={i} className="col section-holder">
                                { i === 2 || i === 5 ?
                                <div 
                                    className="flex align-between w-100 h-100"
                                    ref={shiftRef}
                                >
                                    <div className="shift w-100 h-100 bg-info">
                                    {dateControl.value === "day" ?
                                        <>
                                            <div 
                                                onMouseDown={(e) => onMouseDownResize(e)}
                                                className="stretch"
                                            ></div>
                                        </>
                                    :
                                        ''
                                    }
                                        <div className="time flex align-between w-100 h-100">
                                            <div>
                                                {i+5}a-{i}p
                                            </div>
                                            <div className="position">
                                                Barista
                                            </div>
                                        </div>
                                        <div className="edit flex align-between w-100 h-100">
                                            <div className="btn btn-outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                </svg>
                                            </div>
                                            <div 
                                                className="btn btn-outline"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                                                </svg>
                                            </div>
                                            <div className="btn btn-outline">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : 
                                    <div className="create-shift flex align-between h-100" title="Create Shift">
                                        <div className="flex align-center w-100 h-100 bg-light">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                }
                            </div>
                            )
                        })}
                    </div>
                    {[...Array(5).keys()].map((e) => {
                        return (
                        <div key={`uid-${e}`} id={`uid-${e}`} className="section-row bg-xx-light flex">
                            <div className="section-title">
                                <div className="section-content h-100 flex align-between bg-xx-light">
                                    <div className="flex align-center h-100">
                                        <div className="section-img flex align-center">
                                            <img src="https://via.placeholder.com/150" alt=""/>
                                        </div>
                                        <div className="section-details">
                                            <div className="section-name">
                                                John Doe {e}
                                            </div>
                                            <div className="section-hours">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                                </svg>
                                                {e*3.5}/40
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btn-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {[...Array(
                                dateControl.value === "week" ?
                                    7 
                                : dateControl.value === "2week" ?
                                    14
                                : dateControl.value === "4week" ?
                                    28
                                : 24
                            ).keys()].map((i) => {
                                return (
                                <div 
                                    key={`shift-${i}`} 
                                    id={`uid-${e}-date-${i}`} 
                                    className="col section-holder">
                                    { ( e+2===i || e === i || e+4 === i || e-2 === i || e-4 === i ) && dateControl.value != 'day' ||
                                    dateControl.value == 'day' && e === i ?
                                    <div 
                                        className="flex align-between"
                                        style={{
                                            width: `${
                                                dateControl.value === "day" ?
                                                    `${100*(i+1)}`
                                                : 
                                                    '100'
                                            }%`
                                        }}
                                    >
                                        <div className="shift section-content w-100 bg-primary" >
                                            {dateControl.value === "day" ?
                                                <>
                                                    <div 
                                                        onMouseDown={(e) => onMouseDownResize(e)}
                                                        className="stretch"
                                                    ></div>
                                                </>
                                            :
                                                ''
                                            }
                                            <div className="time flex align-between w-100 h-100">
                                                <div>
                                                    {e+i+5}a-{e+i}p
                                                </div>
                                                <div className="position">
                                                    Barista
                                                </div>
                                            </div>
                                            <div className="edit flex align-between w-100 h-100">
                                                <div className="btn btn-outline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                </div>
                                                <div 
                                                    className="btn btn-outline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                                                    </svg>
                                                </div>
                                                <div className="btn btn-outline">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : 
                                        <div className="create-shift flex align-between h-100" title="Create Shift">
                                            <div className="flex align-center w-100 h-100 bg-light">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    }
                                </div>
                                )
                            })}
                        </div>
                        )
                    })}
                </div>
                <div className="section-container">
                    <div className="section-row flex bg-x-light">
                        <div className="section-title flex">
                            <div className="section-content bg-xx-light w-100 flex align-between">
                                <div>
                                    <div>
                                        Assigned Total
                                    </div>
                                    <div>
                                        28.00 hours
                                    </div>
                                </div>
                                <div className="btn-icon" title="Add New Employee">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {[...Array(
                            dateControl.value === "week" ?
                                7 
                            : dateControl.value === "2week" ?
                                14
                            : dateControl.value === "4week" ?
                                28
                            : 24
                        ).keys()].map((i) => {
                            return (
                                <div key={i} className="col section-holder">
                                    <div className="shift flex h-100 bg-light align-center">
                                        { i }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scheduler