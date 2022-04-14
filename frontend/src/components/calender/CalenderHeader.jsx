
const hours = [ '12:00AM', '1:00AM', '2:00AM', '3:00AM', '4:00AM', '5:00AM', '6:00AM', '7:00AM', '8:00AM', '9:00AM', '10:00AM', '11:00AM', '12:00PM', '1:00PM', '2:00PM', '3:00PM', '4:00PM', '5:00PM', '6:00PM', '7:00PM', '8:00PM', '9:00PM', '10:00PM', '11:00PM' ];

const CalenderHeader = ({ dateControl, date, setStartDate, setDateControl }) => {
    return (
        <div className="section-container calender-timestamp header-row">
            <div className="section-row flex">
                <div className="section-title flex">
                    <div className="section-content w-100 flex align-between">
                        <div>
                            EMPLOYEE
                        </div>
                        {/* <div className="btn-icon" title="Add New Employee">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                            </svg>
                        </div> */}
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
                    <div key={`header-row-${i}`} className="col section-holder">
                        <div className="flex align-between w-100 h-100">
                            <div 
                                className={`shift w-100 h-100${
                                    dateControl.value !== 'day' &&
                                    new Date().setHours(0,0,0,0) === new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).setHours(0,0,0,0) ?
                                        ' today'
                                    : ''
                                }`}
                                onClick={() => {
                                    if(dateControl.value !== 'day') {
                                        setStartDate(new Date(date.getFullYear(), date.getMonth(), date.getDate()+i));
                                        setDateControl({ value: 'day', label: 'Day' });
                                    }
                                }}
                            >
                                { dateControl.value === "day" ?
                                    <div className="hours flex align-center w-100 h-100">
                                        { hours[i] }
                                    </div>
                                :
                                    <div className="flex align-between w-100 h-100">
                                        <div>
                                            { new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).toLocaleString('en-us', {  weekday: 'short' }) }
                                        </div>
                                        <div>
                                            { new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).toLocaleString('en-us', {  month: 'short', day: 'numeric' })}
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
    )
}

export default CalenderHeader