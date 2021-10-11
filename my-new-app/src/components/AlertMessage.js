import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({message}) => {
  return (
    message &&
    <div className="alert alert-danger mx-5 mt-4 text-center" role="alert">
      {message}
    </div>
  )
}

AlertMessage.propTypes = {
  message: PropTypes.string
}

export default AlertMessage;