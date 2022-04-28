import { countTotalHours } from '../../constance/helpers'; 
import { DayShift, WeekShift } from '../';
import { timeIcon } from '../../constance/icons';

const OpenShift = ({ dateControl, shifts, fromDate, toDate, startDate }) => {

    return (
        <div className="section-row flex open-shift user-row">
            <div className="section-title flex align-center">
                <div className="section-content flex align-between">
                    <div className="flex align-center">
                        <div className="section-img">
                        </div>
                        <div className="section-details">
                            <div className="section-name">
                                Open Shift
                            </div>
                            <div className="section-hours">
                                <div className="flex align-center">
                                    {timeIcon}
                                    {countTotalHours(null, shifts, dateControl.value === 'day' ? startDate : null, fromDate, toDate)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {shifts && (
                dateControl.value != "day" ?
                    <WeekShift
                        dateControl={dateControl}
                        fromDate={fromDate}
                    />
                :
                    <DayShift
                        dateControl={dateControl}
                        startDate={startDate}
                        fromDate={fromDate}
                    />
            )}
        </div>
    )
}

export default OpenShift