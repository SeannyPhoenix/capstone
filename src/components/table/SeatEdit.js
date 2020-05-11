import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default function SeatEdit({ seat, handleAction }) {
  // const [profile, setProfile] = useState(seat.profile);
  // const [role, setRole] = useState(seat.role);

  // async function saveEdits(event) {
  //   if (event) {
  //     event.preventDefault();
  //   }
  //   handleAction('save', seat._id, {
  //     profile: event.target.profile.value,
  //     role: event.target.role.value,
  //   });
  // }

  return (
    <Form>
      <div>
        {`Test ${seat.profile}`}
      </div>
    </Form>
  );

  // return (
  //   <Form onSubmit={saveEdits}>
  //     <Form.Group>
  //       <Form.Control as="select" name="profile">
  //         <option value="">unassigned</option>
  //       </Form.Control>
  //       <Form.Control as="select" name="role">
  //         <option value="gm">Game Master</option>
  //         <option value="player">Player</option>
  //       </Form.Control>
  //       <Button type="submit">Save</Button>
  //       <Button
  //         onClick={() => {
  //           handleAction('delete', seat._id);
  //         }}
  //       >
  //         Delete
  //       </Button>
  //       <Button
  //         onClick={() => {
  //           handleAction('cancel');
  //         }}
  //       >
  //         Cancel
  //       </Button>
  //     </Form.Group>
  //   </Form>
  // );
}
