import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

export default function SeatIcon({
  seat, rotation, remove, action, setAction,
}) {
  const [rot, setRot] = useState(null);

  useEffect(() => {
    setTimeout(
      () => {
        setRot(rotation);
      },
      rotation ? 100 : 0,
    );
  }, [rotation]);

  function highlight() {
    if (action.action && action.id === seat._id) {
      return 'border-primary shadow';
    }
    return 'border-dark';
  }

  return (
    <Image
      src="https://i.pinimg.com/564x/83/d9/69/83d969612101a25638e278cd08c6c313.jpg"
      className={`
        seat
        ${rot !== null ? `rotate-${rot}` : ''}
        ${highlight()}
        rounded-circle`}
      onMouseEnter={() => {
        if (action.action !== 'edit') {
          setAction({ action: 'hover', id: seat._id });
        }
      }}
      onMouseOut={() => {
        if (action.action !== 'edit') {
          setAction({ action: '', id: null });
        }
      }}
    />
  );
}
