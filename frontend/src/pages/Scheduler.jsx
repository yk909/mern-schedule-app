import { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if(!id && company) {
            navigate(`/scheduler/${company.businesses[0]._id}`);
        }
    }, [company]);
    return (
        <>
        <section>
            <div className="calender">
                {id && company && company.businesses && (
                    <Nav
                        dateControl={dateControl}
                        setDateControl={setDateControl}
                        startDate={startDate}
                        setStartDate={setStartDate}
                        fromDate={fromDate}
                        toDate={toDate}
                        setfromDate={setfromDate}
                        setToDate={setToDate}
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
                    />
                </DndProvider>
            </div>
        </section>
        </>
    )
}

export default Scheduler;