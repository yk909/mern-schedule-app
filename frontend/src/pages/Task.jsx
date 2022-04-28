import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanyTaskLists } from '../features/task/taskSlice';
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
            console.log('do nothing');
        }
    }, [dispatch]);

    return (
        <section className="task-page">
            {location === 'dashboard' && <CreateTaskList />}
            <Card
                title={'Task Lists'}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                {taskLists?.map(taskList => (
                    <TaskList key={taskList.id} taskList={taskList} />
                ))}
            </Card>
        </section>
    )
}

export default Task