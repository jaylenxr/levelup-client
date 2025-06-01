'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/event/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getEvents().then((data) => setEvents(data));
  }, []);

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
          <EventCard gameId={event.game} description={event.description} time={event.time} date={event.date} userId={event.organizer} />
        </section>
      ))}
    </article>
  );
}

export default Home;
