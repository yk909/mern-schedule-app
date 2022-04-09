import { hours } from '../../constance/dummyData';
import { Shift } from '../';
import { useDrop } from 'react-dnd';

const ShiftsList = ({date, shiftsArr, i, setShiftsArr}) => {

    const [{ isOver }, drop] = useDrop({
        accept: 'shift',
        drop: (item) => {
            // get element of box where shift is dropped
            const element = document.getElementsByClassName('over')[0];
            console.log(element)
            moveShift(item)
        },
        collect: monitor => ({
            isOver: !!monitor.isOver()
        }),
    });

    const moveShift = (item) => {
        console.log(shiftsArr);

        return setShiftsArr([...shiftsArr, item.shift]);
    }

    return (
        <div 
            key={`open-shift-day-${i}`}
            id={ `${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getFullYear()}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getMonth()+1}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getDate()}` }
            className={`col section-holder ${isOver ? 'over' : ''}`}
            ref={drop}
            style={{
                opacity: isOver ? 0.5 : 1,
                background: isOver ? 'var(--color-secondary)' : '',
            }}>
            { shiftsArr.map((shift, e) => {
                return (
                    shift.date === `${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getFullYear()}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getMonth()+1}-${new Date(date.getFullYear(), date.getMonth(), date.getDate()+i).getDate()}` &&
                    <Shift
                        key={`shift-row-${e}`}
                        shift={shift}
                    />
                )
            })}
            <div className="create-shift flex align-end" title="Create Shift">
                <div className="flex align-center w-100 h-100">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default ShiftsList