'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/context/authContext';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents, joinEvent, leaveEvent } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getAllEvents = () => {
    if (user?.uid) {
      getEvents(user.uid).then((data) => setEvents(data));
    }
  };
  useEffect(() => {
    getAllEvents();
  }, [user?.uid]);

  const handleJoinEvent = (eventId) => {
    if (user?.uid) {
      joinEvent(eventId, user.uid).then((data) => {
        setEvents(data);
      });
    }
  };

  const handleLeaveEvent = (eventId) => {
    if (user?.uid) {
      leaveEvent(eventId, user.uid).then((data) => {
        setEvents(data);
      });
    }
  };
  return (
    <article className="events">
      <h1>Events</h1>
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        Register New Event
      </Button>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard id={event.id} gameId={event.game} description={event.description} time={event.time} date={event.date} userId={event.organizer} onUpdate={getAllEvents} />
          {/* TERNARY FOR JOIN/LEAVE BUTTONS */}
          {event.joined ? (
            <Button variant="danger" onClick={() => handleLeaveEvent(event.id)} className="mt-2">
              Leave Event
            </Button>
          ) : (
            <Button variant="success" onClick={() => handleJoinEvent(event.id)} className="mt-2">
              Join Event
            </Button>
          )}
        </section>
      ))}
    </article>
  );
}

export default Home;
