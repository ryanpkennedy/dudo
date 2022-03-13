import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import * as sc from './styled';
import { SocketContext } from '../../Context/SocketProvider';
import BidWindow from '../../components/BidWindow';
import DudoButton from '../../components/DudoButton';
import EvenButton from '../../components/EvenButton';
import Dice from '../../components/Dice';
import Cup from '../../atoms/Cup';
import CupUp from '../../atoms/CupUp';
import Banner from '../../atoms/Banner';

const Bid = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [showDice, setShowDice] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const [diceArray, setDiceArray] = useState<number[]>(
    gameState.users[playerState.username!].currentDice || []
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

  let lastTurn =
    gameState.turn === 0 ? usersArray.length - 1 : gameState.turn - 1;

  const diceCup =
    diceArray.length > 0 ? (
      <sc.DiceCupContainer>
        <sc.CupContainer
          onClick={() => {
            setShowDice((prev) => !prev);
            setShowHint(false);
          }}
          showDice={showDice}>
          <Cup></Cup>
        </sc.CupContainer>

        <Dice dice={diceArray}></Dice>
      </sc.DiceCupContainer>
    ) : (
      <sc.DiceCupContainer>
        <sc.CupUpContainer>
          <CupUp></CupUp>
        </sc.CupUpContainer>
      </sc.DiceCupContainer>
    );

  const lastBidElement =
    gameState.lastBid?.amount !== 0 &&
    usersArray[lastTurn] !== playerState.username ? (
      <div>
        {usersArray[lastTurn]} bid {gameState.lastBid?.amount}{' '}
        {gameState.lastBid?.face}'s
      </div>
    ) : (
      <></>
    );

  const turnElement = (
    <sc.TurnContainer>
      <Banner></Banner>
      <sc.TurnString>
        {playerState?.username === usersArray[gameState.turn]
          ? 'Your turn'
          : `${usersArray[gameState.turn]}'s turn`}
      </sc.TurnString>
    </sc.TurnContainer>
  );

  return (
    <>
      {lastBidElement}
      {turnElement}
      {diceCup}
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
      {playerState?.username === usersArray[gameState.turn] &&
      diceArray.length !== 0 ? (
        <sc.ActionsContainer>
          <BidWindow></BidWindow>
          <DudoButton></DudoButton>
          <EvenButton></EvenButton>
        </sc.ActionsContainer>
      ) : (
        <></>
      )}
      {showHint && diceArray.length > 0 ? (
        <sc.Hint>tap cup to reveal dice</sc.Hint>
      ) : (
        <></>
      )}
    </>
  );
};

export default Bid;
