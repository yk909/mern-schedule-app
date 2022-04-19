const countTotalHours = (employee, shifts, startDate, fromDate, toDate) => {
    let hours = 0;
    let minuts = 0;
    if(startDate) {
        shifts && shifts.map(shift => {
            if(
                (new Date(shift.date).setHours(0, 0, 0, 0) === 
                new Date(startDate).setHours(0, 0, 0, 0) &&
                (employee && shift.employee === employee._id)) || 
                (new Date(shift.date).setHours(0, 0, 0, 0) === 
                new Date(startDate).setHours(0, 0, 0, 0) &&
                (!employee && !shift.employee))
            ) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    } else {
        shifts && shifts.map(shift => {
            if(
                (employee && (shift.employee === employee._id)) || 
                (!employee && !shift.employee)
            ) {
                let sTime = new Date(shift.date).setHours(0, 0, 0, 0);
                let fTime = new Date(fromDate).setHours(0, 0, 0, 0);
                let tTime = new Date(toDate).setHours(0, 0, 0, 0);
                if (sTime >= fTime && sTime <= tTime) {
                    hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                    minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
                }
            }
        });
    }

    const resultHours = (hours + minuts / 60).toString().split('.')[0] +'h'
    const resultMinuts = (hours + minuts / 60).toString().split('.')[1] ? (+((hours + minuts / 60).toFixed(2)).toString().split('.')[1] / 100 * 60) + 'm' : '';
    
    return resultHours + resultMinuts;
}

const countAsignedTotalHours = (shifts, startDate, fromDate, toDate) => {
    let hours = 0;
    let minuts = 0;
    if(startDate) {
        shifts && shifts.map(shift => {
            if(
                new Date(shift.date).setHours(0, 0, 0, 0) === 
                new Date(startDate).setHours(0, 0, 0, 0) 
            ) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    } else {
        shifts && shifts.map(shift => {
            let sTime = new Date(shift.date).setHours(0, 0, 0, 0);
            let fTime = new Date(fromDate).setHours(0, 0, 0, 0);
            let tTime = new Date(toDate).setHours(0, 0, 0, 0);
            if (sTime >= fTime && sTime <= tTime) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    }

    const resultHours = (hours + minuts / 60).toString().split('.')[0] +'h'
    const resultMinuts = (hours + minuts / 60).toString().split('.')[1] ? (+((hours + minuts / 60).toFixed(2)).toString().split('.')[1] / 100 * 60) + 'm' : '';
    
    return resultHours + resultMinuts;
}

export {
    countTotalHours,
    countAsignedTotalHours
}