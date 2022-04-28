import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, EditTaskList, AddTask } from '../';
import { calenderRangeIcon, briefcaseIcon, usersIcon, closeIcon } from '../../constance/icons';
import './styles/TaskList.css';

const TaskList = ({taskList}) => {
    const [isOpenn, setIsOpen] = useState(true);
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
                        <div className="task-list-detail">
                            {calenderRangeIcon}
                            {taskList.frequency}
                        </div>
                        {taskList.repeat && taskList.repeat.length > 0 && (
                            <div className="task-list-detail">
                                {calenderRangeIcon}
                                {taskList.repeat.join(', ')}
                            </div>
                        )}
                        <div className="task-list-detail">
                            {briefcaseIcon}
                            {taskList.businesses.map(business => (
                                <span key={business._id}>{business.name}</span>
                            ))}
                        </div>
                        <div className="task-list-detail">
                            {usersIcon}
                            {taskList.positions.map(position => (
                                <span key={position}>{position}</span>
                            ))}
                        </div>
                    </div>
                    <div className="task-items px-1">
                        {taskList.taskItems.map(task => (
                            <div key={task._id} className="task-item">
                                <div className="flex align-between">
                                    <h3 className="title-4">{task.title}</h3>
                                    <button 
                                        className="btn-icon btn-icon-danger"
                                        onClick={() => console.log(task._id)}
                                    >
                                        {closeIcon}
                                    </button>
                                </div>
                                {task.description && (
                                    <p>- {task.description}</p>
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