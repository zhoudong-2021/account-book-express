import React from 'react';
import PropTypes from 'prop-types';
import { CHART_VIEW, LIST_VIEW } from '../utility';


const ViewTab = ({activeTab, onTabChange}) => {
const getClassName = (activeTab, viewType) =>
(activeTab === viewType) ? "nav-link active" : "nav-link";


return (
<ul className="nav nav-tabs nav-fill mt-4  ">
  <li className="nav-item"
    onClick={() => onTabChange(LIST_VIEW)}>
    <a href="#" className={getClassName(activeTab, LIST_VIEW)}>
      <div className="d-flex align-items-center justify-content-center"><ion-icon name="list" ></ion-icon>
        <span className="fs-5 ps-2">List View</span></div></a>

  </li>
  <li className="nav-item"
    onClick={() => onTabChange(CHART_VIEW)}>
    <a className={getClassName(activeTab, CHART_VIEW)}>
      <div className="d-flex align-items-center justify-content-center"><ion-icon name="cellular" ></ion-icon>
        <span className="fs-5 ps-2">Chart View</span></div></a>
  </li>
</ul>
)
}

ViewTab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func
}

export default ViewTab;