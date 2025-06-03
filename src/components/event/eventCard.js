import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent } from '../../utils/data/eventData';

function EventCard({ id, gameId, description, date, time, userId, onUpdate }) {
  const deleteCurrentEvent = () => {
    if (window.confirm(`Delete ${gameId}?`)) {
      deleteEvent(id).then(() => onUpdate());
    }
  };

  const router = useRouter();

  return (
    <Card className="text-center">
      <Card.Header>{gameId}</Card.Header>
      <Card.Body>
        <Card.Title>Organized by: {userId}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>
          <strong>Date:</strong> {date} at {time}
        </Card.Text>
        <Button
          onClick={() => {
            router.push(`/events/edit/${id}`);
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
            deleteCurrentEvent();
          }}
        >
          🗑️ Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  gameId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
