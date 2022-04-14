// create dummy data for users shifts
const employees = [
    {
        id: 1,
        user: {
            firstName: 'John'
        },
        position: 'Barista',
        business: 'Hungry Ghost Coffee',
        isActive: true,
        isManager: false,
        shifts: [
            {
                id: 1,
                user: 'John',
                scheduledBy: 'Bohdan',
                business: 'Hungry Ghost Coffee',
                color: 'bg-success',
                date: '2022-4-6',
                position: 'Barista',
                startTime: '09:00AM',
                endTime: '03:00PM'
            },
        ]
    },
    {
        id: 2,
        user: {
            firstName: 'Bohdan'
        },
        position: 'Manager',
        business: 'Hungry Ghost Coffee',
        isManager: true,
        isActive: true,
        shifts: [
            {
                id: 3,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                business: 'Hungry Ghost Coffee',
                color: 'bg-danger',
                date: '2022-4-6',
                position: 'Manager',
                startTime: '06:00AM',
                endTime: '12:00PM'
            },
            {
                id: 4,
                user: 'Bohdan',
                scheduledBy: 'Bohdan',
                color: 'bg-danger',
                position: 'Manager',
                business: 'Hungry Ghost Coffee',
                date: '2022-4-6',
                startTime: '05:00PM',
                endTime: '11:00PM'
            },
        ]
    },
    {
        id: 3,
        user: {
            firstName: 'Eugene'
        },
        position: 'Barista',
        isActive: false,
        business: 'Hungry Ghost Coffee',
        shifts: [
            {
                id: 5,
                user: 'Eugene',
                scheduledBy: 'Bohdan',
                color: 'bg-success',
                position: 'Barista',
                business: 'Hungry Ghost Coffee',
                date: '2022-4-8',
                startTime: '07:00AM',
                endTime: '01:00PM'
            },
            {
                id: 2,
                user: 'John',
                scheduledBy: 'Bohdan',
                business: 'Hungry Ghost Coffee',
                color: 'bg-success',
                date: '2022-4-8',
                position: 'Barista',
                startTime: '01:00PM',
                endTime: '10:00PM'
            },
        ]
    },
]

// create dummy data for open shifts with id, scheduledBy, schedule, business, date, startTime, endTime
const openShifts = [
    {
        id: 6,
        scheduledBy: 'Bohdan',
        color: 'bg-info',
        position: 'Barista',
        business: 'Hungry Ghost Coffee',
        date: '2022-4-9',
        startTime: '09:00AM',
        endTime: '05:00PM'
    },
    {
        id: 7,
        scheduledBy: 'Bohdan',
        color: 'bg-info',
        position: 'Barista',
        business: 'Hungry Ghost Coffee',
        date: '2022-4-9',
        startTime: '06:00AM',
        endTime: '12:00PM'
    },
    {
        id: 1,
        scheduledBy: 'Bohdan',
        color: 'bg-info',
        position: 'Barista',
        business: 'Hungry Ghost Coffee',
        date: '2022-4-8',
        startTime: '01:30AM',
        endTime: '06:00AM'
    },
    {
        id: 10,
        scheduledBy: 'Bohdan',
        color: 'bg-info',
        position: 'Barista',
        business: 'Hungry Ghost Coffee',
        date: '2022-4-8',
        startTime: '06:00AM',
        endTime: '01:00PM'
    }
]

const hours = [ '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00' ];
// create array of strings of hours in 24 hours format, with 15 minutes interval
const hoursArray = [
    '00:00', '00:15', '00:30', '00:45', '01:00', '01:15', '01:30', '01:45', '02:00', '02:15', '02:30', '02:45', '03:00', '03:15', '03:30', '03:45', '04:00', '04:15', '04:30', '04:45', '05:00', '05:15', '05:30', '05:45', '06:00', '06:15', '06:30', '06:45', '07:00', '07:15', '07:30', '07:45', '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00', '16:15', '16:30', '16:45', '17:00', '17:15', '17:30', '17:45', '18:00', '18:15', '18:30', '18:45', '19:00', '19:15', '19:30', '19:45', '20:00', '20:15', '20:30', '20:45', '21:00', '21:15', '21:30', '21:45', '22:00', '22:15', '22:30', '22:45', '23:00', '23:15', '23:30', '23:45'
]

const customSelectStyles = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? 'var(--text-light)' : '#var(--text-dark)',
        transition: 'var(--transition-duration)',
        '&:hover': {
            background: 'var(--color-primary)',
            color: "var(--text-light)",
        },
        padding: 15,
        background: state.isSelected ? 'var(--color-primary)' : 'var(--color-main)',
        fontWeight: state.isSelected ? '600' : 'normal',
        cursor: 'pointer',
    }),
    control: () => ({
        border: '2px solid var(--color-main)',
        background: 'var(--color-main)',
        fontWeight: '600',
        display: 'flex',
        height: '41px',
        borderRadius: 'var(--border-radius)',
        boxShadow: 'var(--box-shadow)',
        cursor: 'pointer',
        width: 200,
    }),
    singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        const color = 'var(--text-dark)';

        return { ...provided, opacity, transition, color };
    }
}

const customSelectModalStyles = {
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'var(--color-primary)' : 'var(--color-main)',
        transition: 'var(--transition-duration)',
        '&:hover': {
            background: 'var(--color-primary)',
            color: "var(--text-light)",
        },
    }),
    control: (provided, state) => ({
        ...provided,
        background: 'var(--color-main)',
        fontWeight: '600',
        display: 'flex',
        border: 'none',
        borderBottom: state.isSelected ? '2px solid var(--color-primary)' : '2px solid var(--color-secondary)',
        minHeight: '41px',
        borderRadius: '0',
        cursor: 'pointer',
        width: '100%',
        transition: 'var(--transition-duration)',
        '&:hover': {
            borderBottom: '2px solid var(--color-primary)',
            color: "var(--text-light)",
            boxShadow: 'none',
        },
        '&:focus': {
            outline: 'none',
            boxShadow: 'none',
        },
        '&:active': {
            outline: 'none',
            boxShadow: 'none',
        },
    }),
    singleValue: (provided, state) => {
        const transition = 'opacity 300ms';
        const color = 'var(--text-dark)';


        return { ...provided, transition, color };
    }
}

const timeframeOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: '2week', label: '2 Week' },
    { value: '4week', label: '4 Week' },
];

const positions = [
    'Owner',
    'Director',
    'Manager',
    'Barista',
    'Bartender',
    'Kitchen',
    'Cashier',
    'Server',
    'Busser',
    'Host',
    'Cook',
    'Team Lead',
    'Chef',
    'Cooridnator',
    'Catering',
    'Assistant',
    'Cleaning',
    'Security',
    'Other',
    'Co-Owner',
    'Co-Director',
    'Co-Manager',
    'Associate',
    'Co-Barista',
    'Co-Bartender',
    'Co-Kitchen',
    'Kitchen Manager',
    'Accountant',
    'Mechanic',
    'Sales',
    'Supervisor',
    'Shift Lead',
    'Shift Manager',
    'Driver',
    'Delivery',
    'Waiter/Waitress',
    'CIO',
];

export { 
    employees,
    openShifts, 
    hours, 
    hoursArray,
    customSelectStyles, 
    timeframeOptions,
    positions,
    customSelectModalStyles
};