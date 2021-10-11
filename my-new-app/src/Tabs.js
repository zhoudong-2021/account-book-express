import React, { Children } from "react";
import PropTypes from 'prop-types';


const Tabs = (props) => {

  const { children, tabs, activeTab, onTabChange } = props;

  const getClassName = (activeTab, viewType) =>
    (activeTab === viewType) ? "nav-link active" : "nav-link";


  return (
    <ul className="nav nav-tabs nav-fill mt-4 ">
      {Children.map(children, (child, index) => (
        <li className="nav-item"
          onClick={() => onTabChange(tabs[index])}>
          <a className={getClassName(activeTab, tabs[index])}>
            {child}
          </a>
        </li>
      ))}
    </ul>
  )
}

Tabs.propTypes = {
  children: PropTypes.array.isRequired,
  tabs: PropTypes.array.isRequired, 
  activeTab: PropTypes.string, 
  onTabChange: PropTypes.func.isRequired
}

export default Tabs;

export const Tab = ({ child }) =>
  <React.Fragment>{child}</React.Fragment>
