import { useState } from 'react';
import Select from 'react-select';
import { hours } from '../../constance/dummyData';
import { Modal } from '../';

const CreateShift = ({ date, employee }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    function openModal() {
      setModalIsOpen(true);
    }

    function closeModal() {
      setModalIsOpen(false);
    }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        contentLabel="Create Shift"
      >
        <div className="create-shift-form">
          <div className="create-shift-form-header">
            {console.log(employee)}
            <p><b>{
              employee ? 
                employee.user.firstName :
              "Open Shift"
            }</b>, on <b>{ date.toLocaleString('en-us', {  weekday: 'short', month: 'short', day: 'numeric' })}</b></p>
          </div>
          <div className="create-shift-body">
            {/* <Select
              value={dateControl}
              onChange={(e) => {setDateControl(e); setStartDate(new Date);}}
              isSearchable={false}
              options={timeframeOptions}
              styles={customSelectStyles}
            /> */}
          </div>
        </div>
      </Modal>
      <div className="create-shift flex align-end" title="Create Shift">
        <div className="flex align-center w-100 h-100" onClick={openModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
            </svg>
        </div>
    </div>
    </>
  )
}

export default CreateShift