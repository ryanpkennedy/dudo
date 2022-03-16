import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Bid from '../Bid';
import Results from '../Results';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  console.log('(Game) playerState.phase: ', gameState.phase);
  return <>{gameState.phase === 'bid' ? <Bid></Bid> : <Results></Results>}</>;
};

export default Game;
