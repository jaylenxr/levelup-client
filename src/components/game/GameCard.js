'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteGame } from '../../utils/data/gameData';

function GameCard({ id, title, maker, numberOfPlayers, skillLevel, gameTypeId, onUpdate }) {
  const deleteCurrentGame = () => {
    if (window.confirm(`Delete ${title}?`)) {
      deleteGame(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{gameTypeId}</Card.Text>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
        <Card.Text className="text-muted">Skill Level: {skillLevel}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button
          onClick={() => {
            router.push(`/games/edit/${id}`);
          }}
          variant="outline-secondary"
          size="sm"
          className="mt-2"
        >
          ✏️ Edit
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          className="mt-2"
          onClick={() => {
            deleteCurrentGame();
          }}
        >
          🗑️ Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

GameCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  maker: PropTypes.string.isRequired,
  numberOfPlayers: PropTypes.number.isRequired,
  skillLevel: PropTypes.number.isRequired,
  gameTypeId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default GameCard;
