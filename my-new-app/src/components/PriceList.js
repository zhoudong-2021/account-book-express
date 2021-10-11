import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

const PriceList = ({ items, onDeleteItem }) => {
  const [itemSelected, setItemSelected] = useState(null);

  let history = useHistory();
  const hanldeEdit = (item) => {
    let id = item.id;
    history.push("/edit/" + id);
  }

  return (
      <ul className="list-group list-group-flush my-5 ">
        {items.map((item) => (
          <li key={item.id} className="list-group-items d-flex justify-content-between align-items-center mt-2">
            <span className="col-1">
              <ion-icon name={item.category.icon} size="large"></ion-icon>
            </span>
            <span className="col-4 ps-1">
              {item.title}
            </span>
            <span className="col-2">
              {item.category.type === "Expense" ? "- " : "+ "}
              ${item.amount}
            </span>
            <span className="col-3">
              {item.date}
            </span>

            <button type="button" className="col-1 btn btn-primary me-1"
              onClick={() => hanldeEdit(item)}>
              Edit
            </button>

           
              {/* <!-- Button trigger modal --> */}
              <button type="button" className="col-1 text-center btn btn-danger" 
              data-bs-toggle="modal" data-bs-target="#exampleModal"
              onClick={()=>{setItemSelected(item)}}
              >
                Delete
              </button>

              {/* <!-- Modal --> */}
              <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Alert</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      Are you sure to delete? {itemSelected && itemSelected.id}
                    </div>
                    <div className="modal-footer">
                      
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                      // onClick={() => onDeleteItem(item)}
                      onClick={() => onDeleteItem(itemSelected)}
                      >Yes</button>
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    </div>
                  </div>
                </div>
              </div>

            {/* </span> */}

          </li>
        ))}
      </ul>
    
  )
}

PriceList.PropType = {
  items: PropTypes.array.isRequired,
  onDeleteItem: PropTypes.func.isRequired
}

export default PriceList;