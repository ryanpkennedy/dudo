import React, { useContext, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Bid from '../Bid';
import Results from '../Results';
import Winner from '../Winner';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  const gamePage = (phase: any) => {
    switch (phase) {
      case 'bid':
        return <Bid></Bid>;
      case 'results':
        return <Results></Results>;
      case 'winner':
        return <Winner></Winner>;
    }
  };

  return <>{gamePage(playerState.phase)}</>;
};

export default Game;
