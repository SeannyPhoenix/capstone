import React, { useState, useEffect } from 'react';
import { Col, Dropdown } from 'react-bootstrap';
import models from '../../models';

export default function TableGame({ game, updateData, edit }) {
  const [allGames, setAllGames] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    setGameList(
      allGames.map((game) => (
        <Dropdown.Item
          key={game._id}
          onClick={() => {
            updateData({ game });
          }}
        >
          {game.name}
        </Dropdown.Item>
      )),
    );
  }, [allGames, updateData]);

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
    <Col md={6}>
      <div>Game:</div>
      <Dropdown>
        <Dropdown.Toggle variant="none" disabled={!edit}>
          {game ? game.name : 'Choose Game'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {gameList}
        </Dropdown.Menu>
      </Dropdown>
    </Col>
  );
}
