import { useSelector, useDispatch } from 'react-redux';
import { hours } from '../../constance/dummyData';
import { Shift } from '../';
import { CreateShift } from '../';
import { useDrop } from 'react-dnd';
import { editShift } from '../../features/shift/shiftSlice';

const ShiftsList = ({date, shiftsArr, i, setShiftsArr, shifts, employee}) => {
    // const { shifts } = useSelector(state => state.shift);
    const dispatch = useDispatch();

    const [{ isOver }, drop] = useDrop({
        accept: 'shift',
        drop: (item) => {
            // get element of box where shift is dropped
            const element = document.getElementsByClassName('over')[0];
            console.log(element)
            console.log(item)
            moveShift(item, element)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
    });

    const moveShift = (item, element) => {
        const newDate = element.id.split('-id-')[0];
        const id = element.id.split('-id-')[1];
        const data = {
            id: item.shift._id,
            date: new Date (newDate),
            employee: id === 'openShift' ? null : id,
        }
        dispatch(editShift(data))
    }

    return (
        <div 
            key={`open-shift-day-${i}`}
            id={ 
                `${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getFullYear()}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getMonth()+1}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getDate()}-id-${employee ? employee._id : 'openShift'}`
                }
            className={`col section-holder ${isOver ? 'over' : ''}`}
            ref={drop}
            style={{
                opacity: isOver ? 0.5 : 1,
                background: isOver ? 'var(--color-secondary)' : '',
            }}>
            { shifts && shifts.map((shift, e) => {
                return (
                    (new Date(shift.date).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' })) === 
                    (new Date(date.getFullYear(), date.getMonth(), date.getDate()+i)).toLocaleString('en-us', { year: 'numeric', day: 'numeric', month: 'numeric' }) &&
                    <Shift
                        key={`shift-row-${e}`}
                        shift={shift}
                        employee={employee}
                    />
                )
            })}
            <CreateShift 
                date={new Date(date.getFullYear(), date.getMonth(), date.getDate()+i)}
                employee={employee}
            />
        </div>
    )
}

export default ShiftsList