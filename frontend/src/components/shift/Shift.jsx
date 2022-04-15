import { useEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { toast } from 'react-toastify';
import { EditShift } from '../';

const Shift = ({ shift, employee, index, endTimeOnResize, onMouseDownResize }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const [totalHours, setTotalHours] = useState(0);

    const [{ isDragging, opacity }, drag] = useDrag({
        type: 'shift',
        item: {
            shift,
            // index,
        },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    const newCalcTotalHours = ( a, b ) => {
        let start = new Date().setHours(a.slice(0, 2), a.slice(3, 5), 0, 0);
        let end = new Date().setHours(b.slice(0, 2), b.slice(3, 5), 0, 0);
        return setTotalHours(Math.trunc((end - start) / 3600000) + 'h' + (Math.floor(((end - start) / 60000) % 60) !== 0 ? Math.floor(((end - start) / 60000) % 60) + "m" : ""));
    }

    useEffect(() => {
        let time = (+shift.endTime.slice(0, 2) + (+shift.endTime.slice(3, 5)/60) - +shift.startTime.slice(0, 2) + (+shift.startTime.slice(3, 5)/60))
        let hours = ((+shift.endTime.slice(0, 2))  - (+shift.startTime.slice(0, 2)))
        let minutes = ((+shift.endTime.slice(3, 5)) - (+shift.startTime.slice(3, 5)))/60
        setWidth(((hours+minutes) * 100));
    }, []);

    useMemo(() => {
        newCalcTotalHours(shift.startTime, endTimeOnResize && endTimeOnResize[index] ? endTimeOnResize[index] : shift.endTime);
    }, [endTimeOnResize && endTimeOnResize[index]]);

    return (
        <>
        <div 
            className="shift-parent flex align-between"
            id={`${shift._id}`}
            ref={drag}
            style={{
                marginLeft: 
                    `${
                        endTimeOnResize ?
                            (+shift.startTime.slice(3, 5) / 60) * 100
                        : 
                            0
                    }%`
                ,
                width: `${
                    endTimeOnResize ?
                    (
                        width
                    ) : 100}%`
                ,
                background: `${
                    isDragging ? 'var(--color-main)' : ''
                }`,
            }}
        >
            <div className={`shift w-100 h-100 ${ shift.color }`}>
                {
                    onMouseDownResize ? 
                    <div 
                        onMouseDown={(e) => {onMouseDownResize(e, index, shift.startTime, shift._id)}}
                        className="stretch"
                    ></div>
                    : null
                }
                <div className="time flex align-between w-100 h-100">
                    <div className="clock-time">
                        { shift.startTime }
                        <hr />
                        { 
                            endTimeOnResize && endTimeOnResize[index] ?
                            endTimeOnResize[index]
                            :
                                shift.endTime 
                        }
                    </div>
                    <div className="flex align-center">
                        <div className="total-hours">
                        {   
                            shift && (
                                totalHours
                            )
                        }
                        </div>
                        {shift.position && 
                            <div className="position">
                                { shift.position }
                            </div>
                        }
                    </div>
                </div>
                <div className="edit btn-group flex align-between w-100 h-100">
                    <div className="btn">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <path d="M7.646.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 1.707V5.5a.5.5 0 0 1-1 0V1.707L6.354 2.854a.5.5 0 1 1-.708-.708l2-2zM8 10a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 0 1 .708-.708L7.5 14.293V10.5A.5.5 0 0 1 8 10zM.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708l-2-2zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8z"/>
                        </svg>
                    </div>
                    <div className="btn w-100" onClick={() => setModalIsOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                    </div>
                    {shift.note && (
                        <div className="btn btn-shift-note" onClick={() => { toast.info(shift.note) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                <path d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {shift  && (
            <EditShift
                shift={shift}
                employee={employee}
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
            />
        )}
        </>
    )
}

export default Shift