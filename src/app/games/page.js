'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/game/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };
  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <article className="games">
      <h1>Games</h1>
      <div className="d-flex justify-content-center mb-3">
        <Button
          onClick={() => {
            router.push('/games/new');
          }}
        >
          Register New Game
        </Button>
      </div>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard id={game.id} title={game.title} maker={game.maker} gameTypeId={game.game_type} numberOfPlayers={game.number_of_players} skillLevel={game.skill_level} onUpdate={getAllGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
