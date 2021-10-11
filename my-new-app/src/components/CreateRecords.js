import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";



const CreateRecords = () => {
  let history = useHistory();
  return (
    <ul className="nav nav-pills nav-fill mt-3">
      <li className="nav-item">
        <a className="nav-link active" aria-current="page" href="#"
          onClick={(e) => { e.preventDefault(); history.push("/create"); }}
        >Create A New Record</a>
      </li>
    </ul>
  )

}

CreateRecords.propTypes = {
  // onCreate: PropTypes.func
}

export default CreateRecords;