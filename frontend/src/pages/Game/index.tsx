import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Bid from '../Bid';
import Results from '../Results';
import Winner from '../Winner';

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

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  return <>{gamePage(gameState.phase)}</>;
};

export default Game;
