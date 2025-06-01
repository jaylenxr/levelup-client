'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { createGame, getGameTypes } from '../../utils/data/gameData';

const initialState = {
  skillLevel: 1,
  numberOfPlayers: 0,
  title: '',
  maker: '',
  gameTypeId: 0,
};

function GameForm({ user }) {
  const [gameTypes, setGameTypes] = useState([]);
  const [currentGame, setCurrentGame] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGameTypes().then(setGameTypes);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const game = {
      maker: currentGame.maker,
      title: currentGame.title,
      numberOfPlayers: Number(currentGame.numberOfPlayers),
      skillLevel: Number(currentGame.skillLevel),
      gameType: Number(currentGame.gameTypeId),
      userId: user.uid,
    };

    createGame(game).then(() => router.push('/games'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* TITLE */}
      <InputGroup className="mb-3">
        <InputGroup.Text>🎮</InputGroup.Text>
        <Form.Control type="text" name="title" required value={currentGame.title} onChange={handleChange} placeholder="Game Title" />
      </InputGroup>

      {/* MAKER */}
      <InputGroup className="mb-3">
        <InputGroup.Text>👥</InputGroup.Text>
        <Form.Control type="text" name="maker" required value={currentGame.maker} onChange={handleChange} placeholder="Game Maker" />
      </InputGroup>

      {/* GAMETYPE */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📁</InputGroup.Text>
        <Form.Select name="gameTypeId" required value={currentGame.gameTypeId} onChange={handleChange}>
          <option value="">Select a Game Type</option>
          {gameTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      <Row>
        <Col>
          {/* NUMBER OF PLAYERS */}
          <InputGroup className="mb-3">
            <InputGroup.Text>#</InputGroup.Text>
            <Form.Control type="number" name="numberOfPlayers" required value={currentGame.numberOfPlayers} onChange={handleChange} placeholder="Players" />
          </InputGroup>
        </Col>
        <Col>
          {/* SKILL LEVEL */}
          <InputGroup className="mb-3">
            <InputGroup.Text>⭐</InputGroup.Text>
            <Form.Control type="number" name="skillLevel" required value={currentGame.skillLevel} onChange={handleChange} placeholder="Skill Level" />
          </InputGroup>
        </Col>
      </Row>

      <Button variant="success" type="submit" className="w-100">
        Create Game
      </Button>
    </Form>
  );
}

GameForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default GameForm;
