import React from 'react';

function Toast(props) {
  return (
    <div className="toast show fade" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <strong className="mr-auto">
          {props.title}
        </strong>
        <small>11 mins ago</small>
        <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <i className="fas fa-times" />
        </button>
      </div>
      <div className="toast-body">
        {props.body}
      </div>
    </div>
  );
}

export default Toast;
