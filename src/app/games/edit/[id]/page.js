'use client';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getSingleGame } from '../../../../utils/data/gameData';
import GameForm from '../../../../components/game/GameForm';

function EditGame({ params }) {
  const [editGameItem, setEditGameItem] = useState({});
  const { id } = params;
  const { user } = useAuth();

  useEffect(() => {
    getSingleGame(id).then(setEditGameItem);
  }, [id]);

  return <GameForm user={user} gameObj={editGameItem} />;
}

EditGame.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};

export default EditGame;
