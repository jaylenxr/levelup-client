'use client';

import { clientCredentials } from '../client';

// GET EVENTS (list)
const getEvents = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: uid, // UID only w/o "Bearer" or "Token"
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// GET SINGLE EVENT
const getSingleEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// POST EVENTS (create)
const createEvent = (event) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// PUT EVENT (update)
const updateEvent = (event) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

// DELETE EVENT (destroy)
const deleteEvent = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

// JOIN EVENT (signup)
const joinEvent = (eventId, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${eventId}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: uid,
      },
      body: JSON.stringify({ user_id: uid }),
    })
      .then((response) => response.json())
      .then(() => getEvents(uid)) // gets all joined events by uid
      .then(resolve)
      .catch(reject);
  });

// LEAVE EVENT
const leaveEvent = (eventId, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events/${eventId}/leave`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: uid,
      },
      body: JSON.stringify({ user_id: uid }),
    })
      .then(() => getEvents(uid)) // getEvents will call to refresh the list after leaving an event.
      .then(resolve)
      .catch(reject);
  });
// eslint-disable-next-line import/prefer-default-export
export { getEvents, getSingleEvent, createEvent, updateEvent, deleteEvent, joinEvent, leaveEvent };
