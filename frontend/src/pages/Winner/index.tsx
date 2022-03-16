import React, { useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';

const Winner = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);

  let usersArray = Object.getOwnPropertyNames(gameState.users);

  let winner = usersArray[0] === playerState.username ? 'You' : usersArray[0];

  const endGame = () => {
    console.log('end game');
  };

  return (
    <>
      <div>{`${winner} won!`}</div>
      <div onClick={() => endGame()}>Exit</div>
    </>
  );
};

export default Winner;
