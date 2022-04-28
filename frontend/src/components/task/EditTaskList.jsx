import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { Modal } from '../';
import { editTaskList } from '../../features/task/taskSlice';
import { customSelectModalStyles, weekDaySelectOptions } from '../../constance/localData';

const EditTaskList = ({taskList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const { company } = useSelector(state => state.company);
    const [editTaskList, setEditTaskList] = useState({
        title: taskList.title,
        frequency: taskList.frequency,
        repeat: taskList?.repeat?.map(item => ({value: item, label: item})),
        businesses: taskList.businesses.map(business => ({value: business._id, label: business.name})),
        positions: taskList?.positions?.map(position => ({value: position, label: position})),
    });

    const businessSelect = company?.businesses.map(business => ({
        value: business._id,
        label: business.name
    }));

    const frequencySelect = [
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
    ];

    const positionsSelect = []
    const positionsFilter = company
    ?.businesses?.map(business => business?.positions
        ?.map((position, index) => {
            if(positionsSelect.find(item => item.value === position)) {
                return null;
            } else {
                positionsSelect.push({
                    value: position,
                    label: position
                })
            }
        }))

    const onChange = e => {
        setEditTaskList({
            ...editTaskList,
            [e.target.name]: e.target.value
        });
    }


    const onSubmit = () => {
        // dispatch(editTaskList());
        setIsOpen(false);
    }

    const onSubmitDanger = () => {
        console.log('delete');
        setIsOpen(false);
    }

    return (
        <>
        <Modal
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            contentLabel={`Edit ${taskList.title} Task List`}
            onSubmit={onSubmit}
            actionBtnText="Update"
            onSubmitDanger={onSubmitDanger}
            actionDangerBtnText="Delete"
        >
            <div className="form-group-row">
                <div className="form-group">
                    <label>Title *</label>
                    <input 
                        type="text" 
                        name="title"
                        placeholder="Task List Title"
                        value={editTaskList.title}
                        onChange={onChange}
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label>Frequency *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={frequencySelect}
                        value={editTaskList.frequency}
                        onChange={e => setEditTaskList({ ...editTaskList, repeat: [], frequency: e })}
                    />
                </div>
            </div>
            {(taskList.frequency.value === 'weekly' || taskList.frequency.value === 'monthly') && (
                <div className="form-group">
                    <label>Repeat On *</label>
                    <Select
                        styles={customSelectModalStyles}
                        isMulti={true}
                        options={
                            taskList.frequency.value === 'weekly' ?
                            weekDaySelectOptions :
                            [...Array(31).keys()].map(day => ({
                                value: day + 1,
                                label: day + 1
                            }))
                        }
                        value={editTaskList.repeat}
                        onChange={e => setEditTaskList({ ...editTaskList, repeat: e })}
                    />
                </div>
            )}
            <div className="form-group-row">
                <div className="form-group">
                    <label>Businesses *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={businessSelect}
                        value={editTaskList.businesses}
                        onChange={e => setEditTaskList({ ...editTaskList, businesses: e })}
                        isMulti={true}
                    />
                </div>
                <div className="form-group">
                    <label>Positions *</label>
                    <Select
                        styles={customSelectModalStyles}
                        options={positionsSelect}
                        value={editTaskList.positions}
                        onChange={e => setEditTaskList({ ...editTaskList, positions: e })}
                        isMulti={true}
                    />
                </div>
            </div>
        </Modal>
            <div 
                className="btn btn-outline"
                onClick={() => setIsOpen(true)}
            >
                Edit List
            </div>
        </>
    )
}

export default EditTaskList