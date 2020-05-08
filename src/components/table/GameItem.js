import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import models from '../../models';

export default function GameItem({ game, updateGame }) {
  const [allGames, setAllGames] = useState([]);
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    setGameList(
      allGames.map((game) => (
        <Dropdown.Item
          key={game._id}
          onClick={() => {
            updateGame(game._id);
          }}
        >
          {game.name}
        </Dropdown.Item>
      )),
    );
  }, [allGames, updateGame]);

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
    <div>
      {game ? game.name : 'No game selected'}
      <Dropdown alignRight>
        <Dropdown.Toggle variant="primary" className="float-right">
          Choose Game
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {gameList}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
