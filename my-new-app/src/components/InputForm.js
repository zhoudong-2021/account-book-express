import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getCurrentDate } from '../utility';


const InputForm = ({item, onChange}) => {

  const textInput = useRef(null);
  const amountInput = useRef(null);
  const dateInput = useRef(null);
  const history = useHistory();

  const onSubmit = () => {
    let text = textInput.current.value.toString();
    let amount = amountInput.current.value.toString();
    let date = dateInput.current.value.toString();
    onChange(text, amount, date);
  }

  // const cDate = getCurrentDate();
  // const currentDate = cDate.year + "-" + cDate.month + "-" + cDate.day;
  
  return (
    <div className="mx-5 px-5 mt-5">
      <div className="row mt-4">
        <label htmlFor="colFormLabelLg1" className="col-sm-2 text-end col-form-label col-form-label-lg">Title</label>
        <div className="col-sm-10">
          <input type="text" className="form-control form-control-lg" id="colFormLabelLg1" 
          defaultValue={item && item.title} ref={textInput} 
          />
        </div>
      </div> 
      <div className="row mt-4">
        <label htmlFor="colFormLabelLg2" className="col-sm-2 text-end col-form-label col-form-label-lg">Amount</label>
        <div className="col-sm-10">
          <input type="number" className="form-control form-control-lg" id="colFormLabelLg2" 
          defaultValue={item && item.amount} ref={amountInput}  />
        </div>
      </div>
      <div className="row mt-4">
        <label htmlFor="colFormLabelLg3" className="col-sm-2 text-end col-form-label col-form-label-lg">Date</label>
        <div className="col-sm-10">
          <input type="date" className="form-control form-control-lg" id="colFormLabelLg3" 
          defaultValue={(item && item.date)} ref={dateInput} />
        </div>
      </div>
      <div className="d-flex mt-4">
        <div className="col-2"></div>
        <div className="gap-2 d-md-block ">
          <button className="btn btn-primary me-3" type="button"
          onClick={()=>onSubmit()}>Submit</button>
          <button className="btn btn-primary" type="button"
          onClick={()=>history.push("/")}>Cancel</button>
        </div>
      </div>  
    </div>

  )
}

InputForm.propTypes = {
  item: PropTypes.object, 
  onChange: PropTypes.func
}

export default InputForm;