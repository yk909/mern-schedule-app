import { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../";
import Select from 'react-select';
import { customSelectModalStyles } from '../../constance/localData';
import './styles/CreateTaskList.css';

const CreateTaskList = () => {
    const { company } = useSelector(state => state.company);
    const [isOpen, setIsOpen] = useState(false);
    const [taskItemCount, setTaskItemCount] = useState(1);
    const [taskList, setTaskList] = useState({
        name: '',
        frequency: '',
        business: [],
        positions: [],
    });
    const [taskItems, setTaskItems] = useState([{
        title: '',
        description: '',
    }]);

    const businessSelect = company?.businesses.map(business => ({
        value: business._id,
        label: business.name
    }));

    const frequencySelect = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'once', label: 'Once' }
    ];

    const positionsSelect = company?.businesses
    ?.map(business => business?.positions
        ?.map(position => ({
            value: position,
            label: position
        }))
    )

    const onChange = e => {
        setTaskList({
            ...taskList,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = () => {
        console.log(taskList);
        console.log(taskItems);
    }

    return (
        <Card
            title={'Create Task List'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="create-task-list-container">
                <div className="create-task-list-title">
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Title</label>
                            <input 
                                type="text" 
                                name="name"
                                placeholder="Task List Title"
                                onChange={onChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="form-group">
                            <label>Frequency</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={frequencySelect}
                                value={taskList.frequency}
                                onChange={e => setTaskList({ ...taskList, frequency: e })}
                            />
                        </div>
                    </div>
                    <div className="form-group-row">
                        <div className="form-group">
                            <label>Business</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={businessSelect}
                                value={taskList.business}
                                onChange={e => setTaskList({ ...taskList, business: e })}
                                isMulti={true}
                            />
                        </div>
                        <div className="form-group">
                            <label>Positions</label>
                            <Select
                                styles={customSelectModalStyles}
                                options={positionsSelect}
                                value={taskList.positions}
                                onChange={e => setTaskList({ ...taskList, positions: e })}
                                isMulti={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="create-task-items">
                    <div className="title-4 mb-1 ml-1">
                        Task Items
                    </div>
                    {[...Array(taskItemCount)].map((_, index) => (
                        <div key={`task-item-${index}`} className="create-task-item">
                            <div className="form-group">
                                {index + 1 === taskItemCount && index !== 0 ? (
                                    <div className="flex align-between">
                                        <label>Task Item #{index + 1} *</label>
                                        <div className="btn btn-outline"
                                            onClick={() => setTaskItemCount(taskItemCount - 1)}
                                        >
                                            Remove Task Item
                                        </div>
                                    </div>
                                ) : (
                                    <label>Task Item #{index + 1} *</label>
                                )}
                                <input
                                    type="text"
                                    name="taskItem"
                                    placeholder="Task Item"
                                    onChange={(e) => {setTaskItems([...taskItems.slice(0, index), { ...taskItems[index], title: e.target.value }, ...taskItems.slice(index + 1)])}}
                                    autoComplete="off"
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Task Item Description"
                                    onChange={(e) => {setTaskItems([...taskItems.slice(0, index), { ...taskItems[index], description: e.target.value }, ...taskItems.slice(index + 1)])}}
                                    autoComplete="off"
                                />
                            </div>
                        </div>
                    ))}
                    <div className="flex align-between mb-1">
                        <div className="btn btn-outline"
                            onClick={() => setTaskItemCount(taskItemCount + 1)}
                        >
                            Add Task Item
                        </div>
                        <div className="btn btn-primary"
                            onClick={onSubmit}
                        >
                            Create Task List
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CreateTaskList