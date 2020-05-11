import React, { useState, useEffect } from 'react';
import { Col, FormCheck } from 'react-bootstrap';

export default function TablePublished({ published, updateData, edit }) {
  const [isPublished, setIsPublished] = useState(published);

  useEffect(() => {
    setIsPublished(published);
  }, [published]);

  return (
    <Col md={6}>
      <div>Published:</div>
      <div>
        <FormCheck
          type="checkbox"
          checked={isPublished}
          disabled={!edit}
          label={isPublished ? 'Published to web' : 'Unpublished'}
          onChange={(event) => {
            updateData({ published: !isPublished });
            setIsPublished(!isPublished);
          }}
        />
      </div>
    </Col>
  );
}
