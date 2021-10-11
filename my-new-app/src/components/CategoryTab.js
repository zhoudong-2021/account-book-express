import React from 'react';
import PropTypes from 'prop-types';
import { INCOME, EXPENSE } from '../utility';


const CategoryTab = ({ activeTab, onTabChange }) => 
{
  const getClassName = (activeTab, viewType) =>
    (activeTab === viewType) ? "nav-link active" : "nav-link";


  return (
    <ul className="nav nav-tabs nav-fill mt-4  ">
      <li className="nav-item"
        onClick={() => onTabChange(EXPENSE)}>
        <a className={getClassName(activeTab, EXPENSE)}>
          <div className="d-flex align-items-center justify-content-center">
            <ion-icon name="logo-alipay"></ion-icon>
            <span className="fs-5 ps-2">Expense</span></div></a>

      </li>
      <li className="nav-item"
        onClick={() => onTabChange(INCOME)}>
        <a className={getClassName(activeTab, INCOME)}>
          <div className="d-flex align-items-center justify-content-center">
            <ion-icon name="card" ></ion-icon>
            <span className="fs-5 ps-2">Income</span></div></a>
      </li>
    </ul>
  )
}

CategoryTab.propTypes = {
  activeTab: PropTypes.string,
  onTabChange: PropTypes.func
}

export default CategoryTab;