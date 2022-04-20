import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserShifts } from '../features/shift/shiftSlice';
import { UserShifts, UserOpenShifts, Card } from '../components';

const Schedule = () => {
    const [ isCardOpen, setIsCardOpen] = useState(false);
    const { userShifts, isLoading } = useSelector(state => state.shift);
    const { company } = useSelector(state => state.company);
    const dispatch = useDispatch();

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
                        <UserShifts/>
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