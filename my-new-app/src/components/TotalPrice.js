import React from 'react';
import PropTypes from 'prop-types';

const TotalPrice = ({totalIncome, totalExpense}) => {
  return (
    <div className="totalPrice fw-bolder justify-content-around align-items-center fs-5">
      <div>
      <span className="me-3 income">Income: {totalIncome}</span>
      <span className="me-3 expense">Expense: {totalExpense}</span>
      </div>
      <div>
      <span className="me-3 expense">Balance: {totalIncome - totalExpense}</span>
      </div>
    </div>
  )
}

TotalPrice.propTypes = {
  totalExpense: PropTypes.number,
  totalIncome: PropTypes.number
}

export default TotalPrice;