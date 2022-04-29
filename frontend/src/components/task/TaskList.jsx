import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Card, EditTaskList, AddTask } from '../';
import { calenderRangeIcon, briefcaseIcon, usersIcon, closeIcon } from '../../constance/icons';
import { updateTaskList } from '../../features/task/taskSlice';
import './styles/TaskList.css';

const TaskList = ({taskList}) => {
    const [isOpenn, setIsOpen] = useState(true);
    const dispatch = useDispatch();
    const location = useLocation().pathname.split('/')[1];

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
                            <div key={task._id} className="task-item">
                                <div className="flex align-between">
                                    <h3 className="title-4">{index+1}. {task.title}</h3>
                                    <button 
                                        className="btn-icon btn-icon-danger"
                                        onClick={() => 
                                            dispatch(updateTaskList({
                                                _id: taskList._id,
                                                taskItemId: task._id,
                                                action: 'removeTaskItem',
                                            }))
                                        }
                                    >
                                        {closeIcon}
                                    </button>
                                </div>
                                {task.description && (
                                    <p className="ml-1">{task.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default TaskList