import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyTaskLists, getAllUserTaskLists } from '../features/task/taskSlice';
import { TaskList, CreateTaskList, Card } from "../components";
import './styles/TaskPage.css'

const Task = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];
    const { taskLists, isLoading } = useSelector(state => state.task);


    useEffect(() => {
        if(location === 'dashboard') {
            dispatch(getAllCompanyTaskLists());
        } else if (location === 'user') {
            dispatch(getAllUserTaskLists());
        }
    }, [dispatch]);

    return (
        <section className="task-page">
            {location === 'dashboard' && <CreateTaskList />}
            {!isLoading && taskLists?.length === 0 && <p className="title-3 mx-1">No task lists found</p>}
            {!isLoading ?
                taskLists && taskLists?.map((taskList, index) => (
                    <TaskList key={`${taskList._id}-${index}`} taskList={taskList} />
                ))
                : <Card title={'Loading Task Lists...'} isOpen={false} className={'blink'} />
            }
        </section>
    )
}

export default Task