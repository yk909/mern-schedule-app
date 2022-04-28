import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from '../';

const AddTask = ({taskList}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [task, setTask] = useState({
        title: '',
        description: '',
    });
    const dispatch = useDispatch();


    const onSubmit = () => {
        console.log(task)
    }

    return (
        <>
        <Modal
            contentLabel={`Add Task To ${taskList.title} Task List`}
            modalIsOpen={isOpen}
            setModalIsOpen={setIsOpen}
            onSubmit={onSubmit}
            actionBtnText="Add Task"
        >
            <div className="form-group">
                <label>Title *</label>
                <input
                    type="text"
                    name="title"
                    placeholder="Task Title"
                    value={task.title}
                    onChange={e => setTask({ ...task, title: e.target.value })}
                    autoComplete="off"
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    name="description"
                    placeholder="Task Description"
                    value={task.description}
                    onChange={e => setTask({ ...task, description: e.target.value })}
                    maxLength="100"
                    rows="2"
                    autoComplete="off"
                />
            </div>
        </Modal>
        <div 
            className="btn btn-primary"
            onClick={() => setIsOpen(true)}
        >
            Add Task
        </div>
        </>
    )
}

export default AddTask