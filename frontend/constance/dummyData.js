// create dummy data for users shifts
const employees = [
    {
        firstName: 'John',
        position: 'Barista',
        shifts: [
            {
                id: 1,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                schedule: '1',
                business: 'Hungry Ghost Coffee',
                date: '2022-04-06',
                startTime: '09:00AM',
                endTime: '03:00PM'
            },
            {
                id: 2,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                schedule: '1',
                business: 'Hungry Ghost Coffee',
                date: '2022-04-06',
                startTime: '04:00PM',
                endTime: '06:00PM'
            },
        ]
    },
    {
        firstName: 'Bohdan',
        position: 'Manager',
        shifts: [
            {
                id: 1,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                schedule: '1',
                business: 'Hungry Ghost Coffee',
                date: '2022-04-06',
                startTime: '6:00AM',
                endTime: '12:00PM'
            },
            {
                id: 2,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                schedule: '1',
                business: 'Hungry Ghost Coffee',
                date: '2022-04-06',
                startTime: '05:00PM',
                endTime: '11:00PM'
            },
        ]
    },
    {
        firstName: 'Eugene',
        position: 'Barista',
        shifts: [
            {
                id: 1,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                schedule: '1',
                business: 'Hungry Ghost Coffee',
                date: '2022-04-06',
                startTime: '7:00AM',
                endTime: '01:00PM'
            },
        ]
    },
]

// create dummy data for open shifts with id, scheduledBy, schedule, business, date, startTime, endTime
const openShifts = [
    {
        id: 1,
        scheduledBy: 'Bohdan',
        schedule: '1',
        business: 'Hungry Ghost Coffee',
        date: '2022-04-06',
        startTime: '09:00AM',
        endTime: '06:00PM'
    },
    {
        id: 2,
        scheduledBy: 'Bohdan',
        schedule: '1',
        business: 'Hungry Ghost Coffee',
        date: '2022-04-06',
        startTime: '06:00AM',
        endTime: '02:00PM'
    }
]
