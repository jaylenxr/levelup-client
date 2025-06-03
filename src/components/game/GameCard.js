'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

function GameCard({ id, title, maker, numberOfPlayers, skillLevel, gameTypeId }) {
  const router = useRouter();
  return (
    <Card className="text-center">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Card.Title>By: {maker}</Card.Title>
        <Card.Text>{gameTypeId}</Card.Text>
        <Card.Text>{numberOfPlayers} players needed</Card.Text>
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
      </Card.Body>
      <Card.Footer className="text-muted">Skill Level: {skillLevel}</Card.Footer>
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
};

export default GameCard;
