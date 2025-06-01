'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent } from '../../utils/data/eventData';

const initialState = {
  gameId: '',
  description: '',
  date: '',
  time: '',
};

function EventForm({ user }) {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      gameId: Number(currentEvent.gameId),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    createEvent(event).then(() => router.push('/events'));
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* GAME SELECTOR */}
      <InputGroup className="mb-3">
        <InputGroup.Text>🎮</InputGroup.Text>
        <Form.Select name="gameId" required value={currentEvent.gameId} onChange={handleChange}>
          <option value="">Select a Game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>
              {game.title}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      {/* DESCRIPTION */}
      <InputGroup className="mb-3">
        <InputGroup.Text>📝</InputGroup.Text>
        <Form.Control type="text" name="description" required value={currentEvent.description} onChange={handleChange} placeholder="Event Description" />
      </InputGroup>

      <Row>
        <Col>
          {/* DATE */}
          <InputGroup className="mb-3">
            <InputGroup.Text>📅</InputGroup.Text>
            <Form.Control type="date" name="date" required value={currentEvent.date} onChange={handleChange} />
          </InputGroup>
        </Col>
        <Col>
          {/* TIME */}
          <InputGroup className="mb-3">
            <InputGroup.Text>⏰</InputGroup.Text>
            <Form.Control type="time" name="time" required value={currentEvent.time} onChange={handleChange} />
          </InputGroup>
        </Col>
      </Row>

      <Button variant="primary" type="submit" className="w-100">
        Create Event
      </Button>
    </Form>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
