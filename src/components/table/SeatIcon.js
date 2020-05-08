import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';

export default function SeatIcon({ seat, rotation, remove }) {
  const [rot, setRot] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRot(rotation);
    }, 100);
  }, [rotation]);

  return (
    <Image
      src="https://i.pinimg.com/564x/83/d9/69/83d969612101a25638e278cd08c6c313.jpg"
      className={`seat ${rot !== null ? `rotate-${rot}` : ''} rounded-circle`}
      onClick={() => {
        setRot(null);
        setTimeout(() => {
          remove(seat._id);
        }, 300);
      }}
    />
  );
}
