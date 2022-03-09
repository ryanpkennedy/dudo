import React, { useContext, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Avatar from '../../atoms/Avatar';
import * as sc from './styled';
import { Socket } from 'socket.io-client';
import { SocketContext } from '../../Context/SocketProvider';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);

  const [diceArray, setDiceArray] = useState<number[]>(
    gameState.users[playerState.username!].currentDice
  );

  let usersArray = Object.getOwnPropertyNames(gameState?.users);
  console.log('(Game) users array: ', usersArray[gameState.turn]);
  console.log('(Game) playstate.username: ', playerState.username);

  const handleRoll = () => {
    console.log('rolling dice');
    let tempDice = [];
    for (
      let i = 0;
      i < gameState.users[playerState.username!].diceRemaining;
      i++
    ) {
      let dieValue = Math.floor(Math.random() * 6) + 1;
      tempDice.push(dieValue);
    }
    setDiceArray([...tempDice]);
    socket.emit('user-roll', {
      id: localStorage.getItem('id'),
      roll: tempDice,
    });
    console.log('resulting dice array: ', diceArray);
  };

  const handleBid = () => {
    socket.emit('check-dudo');
    socket.emit('increment-turn', { room: playerState.room });
  };

  return (
    <>
      Game
      {diceArray.length === 0 ? (
        <sc.RollButton
          onClick={() => {
            handleRoll();
          }}>
          Roll
        </sc.RollButton>
      ) : (
        <></>
      )}
      <sc.DiceContainer>
        {diceArray.map((num) => {
          return <sc.Die key={Math.random()}>{num}</sc.Die>;
        })}
      </sc.DiceContainer>
      {playerState?.username === usersArray[gameState.turn] &&
      diceArray.length !== 0 ? (
        <sc.ActionsContainer>
          <sc.Button
            onClick={() => {
              handleBid();
            }}>
            Bid
          </sc.Button>
          <sc.Button>Dudo</sc.Button>
          <sc.Button>Even</sc.Button>
        </sc.ActionsContainer>
      ) : (
        <>{`${usersArray[gameState.turn]}'s turn`}</>
      )}
    </>
  );
};

export default Game;
