'use client';

import { clientCredentials } from '../client';

// GET EVENTS (list)
const getEvents = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/events`)
      .then((response) => response.json())
      .then(resolve)
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

// eslint-disable-next-line import/prefer-default-export
export { getEvents, createEvent };
