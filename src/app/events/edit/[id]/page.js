'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import PropTypes from 'prop-types';
import { getSingleEvent } from '../../../../utils/data/eventData';
import EventForm from '../../../../components/event/EventForm';

function EditEvent({ params }) {
  const [eventItem, setEventItem] = useState({});
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleEvent(id).then(setEventItem);
  }, [id]);

  return <EventForm user={user} eventObj={eventItem} />;
}

EditEvent.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};

export default EditEvent;
