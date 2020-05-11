import React from 'react';
import ToastItem from '../components/ToastItem';

function ToastContainer(props) {
  const toasts = props.toasts.map((toast, key) => <ToastItem key={key} toast={toast} />);
  return (
    <div className="toast-container">
      {toasts}
    </div>
  );
}

export default ToastContainer;
