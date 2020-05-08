import React, { useState, useEffect } from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import models from '../../models';

export default function TableName({ game, updateTable, edit }) {
  const [allGames, setAllGames] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    setGameList(
      allGames.map((game) => (
        <Dropdown.Item
          key={game._id}
          onClick={() => {
            updateTable({ game: game._id });
          }}
        >
          {game.name}
        </Dropdown.Item>
      )),
    );
  }, [allGames, updateTable]);

  useEffect(() => {
    if (allGames.length === 0) {
      getGames();
    }
  }, [allGames]);

  async function getGames() {
    const allGames = await models.Game.index();
    setAllGames(allGames);
  }

  return (
    <Row>
      <Col>
        <div>Game:</div>
      </Col>
      <Col>
        <Dropdown>
          <Dropdown.Toggle variant="none" className="float-right">
            {game ? game.name : 'Choose Game'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {gameList}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
}
