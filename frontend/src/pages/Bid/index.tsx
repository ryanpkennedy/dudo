import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import * as sc from './styled';
import { SocketContext } from '../../Context/SocketProvider';
import BidWindow from '../../components/BidWindow';
import DudoButton from '../../components/DudoButton';
import Dice from '../../components/Dice';
import Cup from '../../atoms/Cup';

const Bid = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [showDice, setShowDice] = useState(false);

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
    while (tempDice.length < 6) {
      tempDice.push(0);
    }
    setDiceArray([...tempDice]);
    socket.emit('user-roll', {
      id: localStorage.getItem('id'),
      roll: tempDice,
    });

    console.log('resulting dice array: ', diceArray);
  };

  const diceCup =
    diceArray.length > 0 ? (
      <sc.DiceCupContainer>
        <sc.CupContainer
          onClick={() => {
            setShowDice((prev) => !prev);
          }}
          showDice={showDice}>
          <Cup></Cup>
        </sc.CupContainer>

        <Dice dice={diceArray}></Dice>
      </sc.DiceCupContainer>
    ) : (
      <></>
    );

  return (
    <>
      Bid Phase
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
      {diceCup}
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

export default Bid;
