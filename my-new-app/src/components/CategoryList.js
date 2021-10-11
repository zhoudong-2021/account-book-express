import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CategoryList = ({ categoryList, selectedCategory, onChange }) => {



  const checkSelected = (item, selectedItem) => {
    if (selectedItem)
      return (item.id === selectedItem.id) ? item.icon.substring(0, item.icon.length - 8) : item.icon;
    else
      return item.icon;
  }

  return (
    <div className="d-flex flex-wrap justify-content-start mt-3">
      {categoryList.map((item) => (
        <div key={item.id} className="col-4 text-center">
          <p className="mb-0"><a href="#"
            onClick={(e) => { e.preventDefault(); onChange(item) }}>
            <ion-icon name={checkSelected(item, selectedCategory)} size="large"></ion-icon></a></p>
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  )
}

CategoryList.propTypes = {
  categoryList: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onChange: PropTypes.func
}

export default CategoryList;