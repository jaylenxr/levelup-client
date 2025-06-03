'use client';

import { clientCredentials } from '../client';

// GET GAMES (lists)
const getGames = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`)
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// GET SINGLE EVENT
const getSingleGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// POST GAMES (create)
const createGame = (game) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

const getGameTypes = () =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/gametypes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });

// PUT GAME (update)
const updateGame = (game) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${game.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    })
      .then((response) => resolve(response))
      .catch(reject);
  });

// DELETE GAME (destroy)
const deleteGame = (id) =>
  new Promise((resolve, reject) => {
    fetch(`${clientCredentials.databaseURL}/games/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resolve)
      .catch(reject);
  });

// eslint-disable-next-line import/prefer-default-export
export { getGames, getSingleGame, createGame, getGameTypes, updateGame, deleteGame };
