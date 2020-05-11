import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faGlobe,
  faPen,
  faPlus,
  faSave,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export default function TableListItem(props) {
  const [origin, setOrigin] = useState(props.name || '');
  const [name, setName] = useState(origin);
  const [edit, setEdit] = useState(false);
  const [dirty, setDirty] = useState(name === origin);
  const [viewTable, setViewTable] = useState(false);

  // If we save the table, we need to update
  // the origin and deactive edit mode
  useEffect(() => {
    if (!props.newTable) {
      setOrigin(props.name);
      setEdit(false);
    }
  }, [props.name, props.newTable]);

  // Dirty means unsaved edits
  if (dirty !== (name !== origin)) {
    setDirty(name !== origin);
  }

  function toggleEdit() {
    if (dirty) {
      setName(origin);
    }
    setEdit(!edit);
  }

  // When the form is submitted,
  // either 'Enter' key or icon click
  async function action(event) {
    if (event) {
      event.preventDefault();
    }
    if (dirty) {
      await props.dbAction(props.id, name, props.newTable);
    } else if (edit) {
      setEdit(false);
    } else {
      setViewTable(true);
    }
  }

  // Redirect if we are supposed to view table
  if (viewTable) {
    return <Redirect push to={`/tables/${props.id}`} />;
  }

  return (
    <tr>
      <td className="p-0">
        <Form onSubmit={action}>
          <Form.Group className="m-0">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={edit ? faTimes : faPen}
                    fixedWidth
                    className={`mx-1 ${dirty ? 'text-warning' : 'text-coffee'} ${
                      props.newTable ? 'invisible' : 'visible'
                    }`}
                    onClick={toggleEdit}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                value={name}
                placeholder="New Table"
                readOnly={!props.newTable && !edit}
                onChange={(event) => setName(event.target.value)}
                className={`${dirty ? 'border-warning' : 'border-none'} ${
                  name ? 'text-coffee' : 'text-muted'
                }`}
              />
              <InputGroup.Append>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={faGlobe}
                    fixedWidth
                    className={`mx-1 text-coffee ${props.published ? 'visible' : 'invisible'}`}
                    onClick={action}
                  />
                </InputGroup.Text>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={props.newTable ? faPlus : dirty ? faSave : faExternalLinkAlt}
                    fixedWidth
                    className={`mx-1 ${dirty ? 'text-warning' : 'text-coffee'}`}
                    onClick={action}
                  />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
        </Form>
      </td>
    </tr>
  );
}
