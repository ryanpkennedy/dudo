import React, { useContext } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import Bid from '../Bid';
import Results from '../Results';

const Game = () => {
  const { playerState, setPlayerState } = useContext(PlayerContext);
  return (
    <>
      {playerState.phase === 'bid' ? <Bid></Bid> : <Results></Results>}
      <div>Game</div>
    </>
  );
};

export default Game;
