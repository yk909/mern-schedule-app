import { useState } from 'react';
import { Card } from '../';

const TaskList = ({taskList}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="task-list">
            <Card
                title={taskList.title}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                <div className="task-list-content">
                    {taskList.tasks.map(task => (
                        <div key={task.id}>{task.title}</div>
                    ))}
                </div>
            </Card>
        </div>
    )
}

export default TaskList