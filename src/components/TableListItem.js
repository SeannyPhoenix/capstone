import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen, faTimes, faSave, faExternalLinkAlt,
} from '@fortawesome/free-solid-svg-icons';

export default function TableListItem(props) {
  const origin = props.name || 'Table';

  const [name, setName] = useState(origin);
  const [dirty, setDirty] = useState(name === origin);
  const [viewTable, setViewTable] = useState(false);

  if (dirty !== (name !== origin)) {
    setDirty(name !== origin);
  }

  function cancel() {
    if (dirty) {
      setName(origin);
    }
  }

  function action(event) {
    if (event) {
      event.preventDefault();
    }
    if (dirty) {
      props.dbAction(props.id, name, props.newTable);
    } else {
      setViewTable(true);
    }
  }

  if (viewTable) {
    return <Redirect to={`/tables/${props.id}`} />;
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
                    icon={dirty ? faTimes : faPen}
                    fixedWidth
                    className={`mx-1 ${dirty ? 'text-warning visible' : 'text-coffee invisible'}`}
                    onClick={cancel}
                  />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={dirty ? 'border-warning' : 'border-none'}
              />
              <InputGroup.Append>
                <InputGroup.Text className="px-1 pointer">
                  <FontAwesomeIcon
                    icon={dirty ? faSave : faExternalLinkAlt}
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
