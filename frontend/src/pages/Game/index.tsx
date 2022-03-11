import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Avatar from '../../atoms/Avatar';
import * as sc from './styled';
import { SocketContext } from '../../Context/SocketProvider';
import BidWindow from '../../components/BidWindow';
import DudoButton from '../../components/DudoButton';
import Dice from '../../components/Dice';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [bid, setBid] = useState({ amount: null, face: null });
  const [bidWindow, setBidWindow] = useState(false);

  const [diceArray, setDiceArray] = useState<number[]>(
    gameState.users[playerState.username!].currentDice
  );

  useEffect(() => {
    setDiceArray(gameState.users[playerState.username!].currentDice);
  }, [gameState]);

  let usersArray = Object.getOwnPropertyNames(gameState?.users);

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
      <Dice dice={diceArray}></Dice>
      {playerState?.username === usersArray[gameState.turn] &&
      diceArray.length !== 0 ? (
        <sc.ActionsContainer>
          <BidWindow></BidWindow>
          <DudoButton></DudoButton>
          <sc.Button>Even</sc.Button>
        </sc.ActionsContainer>
      ) : (
        <>{`${usersArray[gameState.turn]}'s turn`}</>
      )}
    </>
  );
};

export default Game;
