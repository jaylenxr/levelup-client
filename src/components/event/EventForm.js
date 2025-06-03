'use client';

import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { getGames } from '../../utils/data/gameData';
import { createEvent, updateEvent } from '../../utils/data/eventData';

const initialState = {
  gameId: 0,
  description: '',
  date: '',
  time: '',
};

function EventForm({ user, eventObj = initialState }) {
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

  useEffect(() => {
    if (eventObj && eventObj.id) {
      setCurrentEvent({
        gameId: String(eventObj.game?.id || 0),
        description: eventObj.description || '',
        date: eventObj.date || '',
        time: eventObj.time || '',
      });
    }
  }, [eventObj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const event = {
      game: Number(currentEvent.gameId),
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      userId: user.uid,
    };

    if (eventObj && eventObj.id) {
      updateEvent(eventObj.id, event).then(() => router.push('/events'));
    } else {
      createEvent(event).then(() => router.push('/events'));
    }
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

      <Button variant="primary" type="submit" className="eForm">
        {eventObj.id ? 'Update' : 'Create'} Event
      </Button>
    </Form>
  );
}

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    gameId: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
};

export default EventForm;
