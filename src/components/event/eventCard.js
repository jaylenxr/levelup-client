import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

function EventCard({ gameId, description, date, time, userId }) {
  return (
    <Card className="text-center">
      <Card.Header>{gameId}</Card.Header>
      <Card.Body>
        <Card.Title>Organized by: {userId}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Date:</strong> {date} at {time}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  gameId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default EventCard;
