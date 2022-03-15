import React, { useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const BidButton = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);

  let usersArray = Object.getOwnPropertyNames(gameState?.users);
  console.log('(Game) users array: ', usersArray[gameState.turn]);
  console.log('(Game) playstate.username: ', playerState.username);

  const checkBid = (currBid: { amount: number; face: number }) => {
    if (currBid.amount > gameState.lastBid?.amount!) {
      return true;
    } else if (
      currBid.amount === gameState.lastBid?.amount! &&
      currBid.face > gameState.lastBid?.face!
    ) {
      return true;
    } else {
      return false;
    }
  };

  const placeBid = () => {
    if (checkBid(playerState.currentBid)) {
      socket.emit('place-bid', {
        bid: playerState.currentBid,
        room: playerState.room,
      });
      let newPlayerState = {
        ...playerState,
        currentBid: { amount: 0, face: 0 },
      };
      setPlayerState(newPlayerState);
      socket.emit('increment-turn', { room: playerState.room });
    } else {
      alert(
        'not a valid bid. amount must be higher or equal and if equal face must be higher'
      );
    }
  };

  return (
    <>
      <div>
        <sc.Button
          onClick={() => {
            placeBid();
          }}>
          Submit
        </sc.Button>
      </div>
    </>
  );
};

export default BidButton;
