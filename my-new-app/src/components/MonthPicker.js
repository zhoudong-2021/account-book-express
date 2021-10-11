import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { convertFormat, generateYearList, generateMonthList } from '../utility';

const MonthPicker = ({ deFaultMonth, defaultYear, onChange }) => {
  const[flag, setFlag] = useState(false);
  const[year, setYear] = useState(defaultYear);
  let month = deFaultMonth;
  

  const toggleMenu = () => {
    setFlag(!flag);
  }

  const checkActive = (current, active) => 
    (current === active) ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action";
    

  useEffect( ()=> {
    const dropDownBtn = document.querySelector("#dropdownButton");
    const closeDorpDownEvent = document.addEventListener("click", (e) => {
      e.preventDefault();
      if(!dropDownBtn.contains(e.target))
        setFlag(false);
    });

  }); 

  return (
    <div>
    <p className="mb-0">Select Year And Month</p>
    <div className="dropdown" id="dropdownButton">
      <button className="btn btn-secondary " type="button" 
      onClick={()=>toggleMenu()}>
        Year {year} Month {month}
      </button>
      {flag &&
      <ul className="dropdown-menu d-flex border-0" aria-labelledby="dropdownMenuButton1">
        <li className="col list-group text-center me-3">
          {
            generateYearList(year).map(item => {
              return <a key={item} href="#" className={checkActive(item, year)}
              onClick={(e)=> {e.preventDefault();setYear(item)}}
              >{item}</a>
            })
          }
        </li>
        <li className="col list-group text-center">
        {
            generateMonthList().map(item => {
              return <a key={item} href="#" className={checkActive(item, month)}
              onClick={(e)=>{e.preventDefault(); onChange(year,item); setFlag(false)}}
              >{item}</a>
            })
          }
        </li>
      </ul>}
    </div>
    </div>
  )
}

MonthPicker.propTypes = {
  deFaultMonth: PropTypes.string.isRequired,
  defaultYear: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default MonthPicker;