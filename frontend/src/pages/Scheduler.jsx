import { useState, forwardRef, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Calender, Nav } from "../components";
import "react-datepicker/dist/react-datepicker.css";
import '../components/calender/styles/Calender.css';
import { customSelectStyles, timeframeOptions } from '../constance/localData';


const Scheduler = () => {
    const [dateControl, setDateControl] = useState(timeframeOptions[1]);
    const [startDate, setStartDate] = useState(new Date());
    const [fromDate, setfromDate] = useState();
    const [toDate, setToDate] = useState(new Date());
    const { company } = useSelector(state => state.company);
    const [ business, setBusiness ] = useState();

    useEffect(() => {
        if(company) {
            setBusiness({ value: company?.businesses[0]?._id, label: company?.businesses[0]?.name });
        }
    }, [company]);

    return (
        <>
        <section>
            <div className="calender">
                {company && business && (
                    <Nav
                        dateControl={dateControl}
                        setDateControl={setDateControl}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        fromDate={fromDate}
                        toDate={toDate}
                        setfromDate={setfromDate}
                        setToDate={setToDate}
                        setBusiness={setBusiness}
                        business={business}
                    />
                )}
                <DndProvider backend={HTML5Backend}>
                    <Calender 
                        fromDate={fromDate}
                        toDate={toDate}
                        startDate={startDate}
                        dateControl={dateControl}
                        setDateControl={setDateControl}
                        setStartDate={setStartDate}
                        business={business}
                    />
                </DndProvider>
            </div>
        </section>
        </>
    )
}

export default Scheduler;