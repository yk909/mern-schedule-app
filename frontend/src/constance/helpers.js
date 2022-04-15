const countTotalHours = (employee, shifts, startDate, fromDate, toDate) => {
    let hours = 0;
    let minuts = 0;
    if(startDate) {
        shifts && shifts.forEach(shift => {
            if(
                new Date(shift.date).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) === 
                new Date(startDate).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) &&
                (employee && shift.employee === employee._id) || 
                (!employee && !shift.employee)
            ) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    } else {
        shifts && shifts.forEach(shift => {
            if(
                (employee && shift.employee === employee._id) || 
                (!employee && !shift.employee)
            ) {
                let sTime = new Date(shift.date).getTime();
                let fTime = new Date(fromDate).getTime();
                let tTime = new Date(toDate).getTime();
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
        shifts && shifts.forEach(shift => {
            if(
                new Date(shift.date).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) === 
                new Date(startDate).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) 
            ) {
                hours += shift.endTime.slice(0,2) - shift.startTime.slice(0,2);
                minuts += shift.endTime.slice(3,5) - shift.startTime.slice(3,5);
            }
        });
    } else {
        shifts && shifts.forEach(shift => {
            let sTime = new Date(shift.date).getTime();
            let fTime = new Date(fromDate).getTime();
            let tTime = new Date(toDate).getTime();
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