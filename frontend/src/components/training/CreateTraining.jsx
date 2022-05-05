import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../";
import Select from 'react-select';
import { toast } from "react-toastify";
import { createTaskList } from "../../features/task/taskSlice";
import { customSelectModalStyles, weekDaySelectOptions } from '../../constance/localData';
import './styles/CreateTraining.css';
import { closeIcon } from "../../constance/icons";

const CreateTraining = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const { company } = useSelector(state => state.company);
    const [training, setTraining] = useState({
        title: '',
        positions: [],
    });
    const [sections, setSections] = useState([{
        title: '',
        description: '',
        items: [{
            title: '',
            description: '',
            images: [],
            videos: [],
        }],
    }]);

    const positionsSelect = []

    useEffect(() => {
        const filter = company
        ?.businesses
        ?.map(business => 
            business
            ?.positions
            ?.map((position, index) => {
                if(positionsSelect.find(item => item.value === position.title)) {
                    return null;
                } else {
                    positionsSelect.push({
                        value: position.title,
                        label: position.title
                    })
                }
            }))
    }, [])


    return (
        <Card
            title={'Create Training'}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
        >
            <div className="create-training">
                <h5 className="title-4 p-3 mb-1 border-bottom">
                    Training Info.
                </h5>
                <div className="form-group-row">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Training title"
                            onChange={e => setTraining({ ...training, title: e.target.value })}
                            value={training.title}
                        />
                    </div>
                    <div className="form-group">
                        <label>Positions</label>
                        <Select
                            isMulti
                            options={positionsSelect}
                            styles={customSelectModalStyles}
                            value={training.positions}
                            onChange={e => setTraining({ ...training, positions: e })}
                        />
                    </div>
                </div>
                <div className="flex align-between border-bottom p-3">
                    <h5 className="title-4 p-3">
                        Training Info.
                    </h5>
                    <div 
                        className="btn btn-outline"
                        onClick={() => setSections([...sections, {
                            title: '',
                            description: '',
                            items: [{
                                title: '',
                                description: '',
                                images: [],
                                videos: [],
                            }],
                        }])}
                    >
                        Add Section
                    </div>
                </div>
                {sections.length > 1 && (
                    sections.map((section, index) => (
                        <div className="form-group-row">
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Section title"
                                    onChange={e => setSections([...sections.slice(0, index), { ...section, title: e.target.value }, ...sections.slice(index + 1)])}
                                    value={section.title}
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Section description"
                                    onChange={e => setSections([...sections.slice(0, index), { ...section, description: e.target.value }, ...sections.slice(index + 1)])}
                                    value={section.description}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </Card>
    )
}

export default CreateTraining