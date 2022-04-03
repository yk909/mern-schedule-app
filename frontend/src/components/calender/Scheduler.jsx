import './styles/Scheduler.css'

const Scheduler = () => {
    return (
        <div className="calender-body">
            <div className="scheduler-wrapper week-view">
                <div className="scheduler-header">
                    <div className="user-info col">
                        <div className="header-col flex align-between">
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
                    {[...Array(7).keys()].map((i) => {
                        return (
                        <div key={i} className="col">
                            <div className="header-col flex align-between">
                                <div>
                                    SUN
                                </div>
                                <div>
                                    {i}
                                </div>
                            </div>
                        </div>
                        )
                    })}
                </div>
                <div className="scheduler-container">
                <div className="user-row flex open-shift">
                    <div className="col user">
                        <div className="flex w-100 h-100">
                            <div className="user-col w-100 h-100 flex align-between">
                                <div className="flex align-center">
                                    <div className="user-img">
                                    </div>
                                    <div className="user-details">
                                        <div className="user-name">
                                            Open Shift
                                        </div>
                                        <div className="user-hours">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-clock" viewBox="0 0 16 16">
                                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                            </svg>
                                            80
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {[...Array(7).keys()].map((i) => {
                        return (
                        <div key={i} className="col shift-holder">
                            { i === 2 || i === 5 ?
                            <div className="flex align-between w-100 h-100">
                                <div className="shift w-100 h-100">
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
                                        <div className="btn btn-outline">
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
                            : ''
                            }
                        </div>
                        )
                    })}
                </div>
                {[...Array(7).keys()].map((e) => {
                    return (
                    <div key={`user-${e}`} className="user-row flex">
                        <div className="col user">
                            <div className="flex w-100 h-100">
                                <div className="user-col w-100 h-100 flex align-between">
                                    <div className="flex align-center">
                                        <div className="user-img">
                                            <img src="https://via.placeholder.com/150" alt=""/>
                                        </div>
                                        <div className="user-details">
                                            <div className="user-name">
                                                John Doe {e}
                                            </div>
                                            <div className="user-hours">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-clock" viewBox="0 0 16 16">
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
                        </div>
                        {[...Array(7).keys()].map((i) => {
                            return (
                            <div key={i} className="col shift-holder">
                                {e+2===i || e === i || e+4 === i || e-2 === i || e-4 === i ?
                                <div className="flex align-between w-100 h-100">
                                    <div className="shift w-100 h-100">
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
                                            <div className="btn btn-outline">
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
                                : ''}
                            </div>
                            )
                        })}
                    </div>
                    )
                })}
                </div>
                <div className="scheduler-footer">
                    <div className="scheduler-footer-total">

                    </div>
                    <div className="scheduler-footer-hours">
                    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scheduler