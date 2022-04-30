import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, EditTaskList, AddTask, TaskItem } from '../';
import { closeIcon, checkMarkIcon } from '../../constance/icons';
import { updateTaskList, createTask, getAllTasksForList } from '../../features/task/taskSlice';
import './styles/TaskList.css';

const TaskList = ({taskList}) => {
    const [isOpenn, setIsOpen] = useState(true);
    const location = useLocation().pathname.split('/')[1];
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllTasksForList(taskList._id));
    }, [dispatch, taskList._id]);

    return (
        <div className="task-list">
            <Card
                title={taskList.title}
                isOpen={isOpenn}
                setIsOpen={setIsOpen}
            >
                {location === 'dashboard' && (
                    <div className="flex align-between mx-1">
                        <EditTaskList taskList={taskList} />
                        <AddTask taskList={taskList}/>
                    </div>
                )}
                <div className="task-list-content mt-1">
                    <div className="task-list-description">
                        <div className="task-list-description-top flex align-between">
                            <div className="task-list-detail title-3 flex flex-column">
                                {taskList.businesses.map(business => (
                                    <span key={business._id}>{business.name} </span>
                                ))}
                            </div>
                            <div className="task-list-detail title-2">
                                {taskList.frequency}
                            </div>
                        </div>
                        <div className="task-list-description-bottom flex align-between">
                            <div className="task-list-detail mr-1">
                                <small className="text-secondary">
                                    {taskList.positions.join(', ')}
                                </small>
                            </div>
                            <div className="task-list-detail ml-1 text-end">
                            {taskList.repeat && taskList.repeat.length > 0 && (
                                <small className="text-secondary">
                                    ({taskList.repeat.join(', ')})
                                </small>
                            )}
                            </div>
                        </div>
                    </div>
                    <div className="task-items px-1">
                        {taskList.taskItems.map((task, index) => (
                            <TaskItem key={task._id} taskList={taskList} taskItem={task} />
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TaskList