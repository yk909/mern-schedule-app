import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserShifts } from '../features/shift/shiftSlice';
import { UserShifts, UserOpenShifts, Card } from '../components';

const Schedule = () => {
    const [ isCardOpen, setIsCardOpen] = useState(false);
    const { userShifts, isLoading } = useSelector(state => state.shift);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const userShiftsFiltred = 
        useSelector(state => state.shift.userShifts)
            ?.filter(shift => shift.employee != null)
            ?.filter(shift => shift.employee.user === user._id);

    useEffect(() => {
        dispatch(getUserShifts());
    }, []);

    return (
        <section>
            {!isLoading && userShifts && company && (
                <>
                    <Card 
                        title="Open Shifts"
                        isOpen={isCardOpen}
                        setIsOpen={setIsCardOpen}
                    >
                        <UserOpenShifts/>
                    </Card>
                    <Card 
                        title="Your Shifts"
                        isOpen={true}
                    >
                        <div className="flex align-between px-1">
                            <p className="title-2">
                                {userShiftsFiltred?.length ? (
                                    'Shifts'
                                ) : (
                                    'No Shifts'
                                )}
                            </p>
                        </div>
                        <div className="user-open-shifts">
                            {userShiftsFiltred?.map((shift, index) => {
                                return (
                                    <UserShifts
                                        key={index}
                                        shift={shift}
                                    />
                                )
                            })}
                        </div>
                    </Card>
                </>
            )}
            {isLoading && (
                <Card className={'blink'}/>
            )}
        </section>
    )
}

export default Schedule