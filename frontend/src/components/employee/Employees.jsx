import { useSelector } from 'react-redux';
import { EmployeeCard } from '..';

const EmployeeList = ({businesses, positions, businessId}) => {
    const { employees, isLoading } = useSelector(state => state.employee);
    return (
        <>
            {employees && [...employees].sort((a, b) => Number(b.isManager) - Number(a.isManager)).map(employee => (
                (businessId === employee.business || businessId === employee.business._id ) && !employee.isOwner && (
                    <EmployeeCard 
                        key={employee._id} 
                        positions={positions}
                        businesses={businesses}
                        employee={employee} 
                    />
                )
            ))}
        </>
    )
}

export default EmployeeList