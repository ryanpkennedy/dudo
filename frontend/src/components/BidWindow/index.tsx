import React, { useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import { DiceArray } from '../../atoms/DiceArray';
import * as sc from './styled';

const BidWindow = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [bidWindow, setBidWindow] = useState(false);
  const diceFaces = [1, 2, 3, 4, 5, 6];

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
    socket.emit('place-bid', {
      bid: playerState.currentBid,
      room: playerState.room,
    });
    let newPlayerState = { ...playerState, currentBid: { amount: 0, face: 0 } };
    setPlayerState(newPlayerState);
    socket.emit('increment-turn', { room: playerState.room });
  };

  const toggleBidWindow = () => {
    if (!bidWindow || (bidWindow && checkBid(playerState.currentBid!))) {
      setBidWindow((prev) => !prev);
    } else {
      alert(
        'not a valid bid. amount must be higher or equal and if equal face must be higher'
      );
    }
  };

  const updateBid = (type: 'face' | 'amount', val: any) => {
    console.log('(BidWindow) update bid');
    if (type === 'amount') {
      //only accept numbers up to 99
      const reg = new RegExp('^[0-9]{1,2}$|^$');
      if (reg.test(val)) {
        let newBid = { ...playerState.currentBid, amount: parseInt(val, 10) };
        let newPlayerState = { ...playerState, currentBid: newBid };
        setPlayerState(newPlayerState);
      }
    } else {
      let newBid = { ...playerState.currentBid, face: parseInt(val, 10) };
      let newPlayerState = { ...playerState, currentBid: newBid };
      setPlayerState(newPlayerState);
    }
  };

  let bidWindowElement = (
    <sc.BidWindowContainer>
      <sc.BidWindow>
        <div>
          <div>Amount</div>
          <input
            value={playerState.currentBid.amount || ''}
            onChange={(e) => {
              updateBid('amount', e.target.value);
            }}
          />
        </div>
        <div>
          <div>Face</div>

          <sc.DiceFaces>
            {diceFaces.map((num) => {
              let SpecificDie = DiceArray[num];
              return (
                <sc.DiceFaceOption
                  selected={playerState.currentBid.face === num}
                  key={num}
                  onClick={() => {
                    updateBid('face', num);
                  }}>
                  <SpecificDie></SpecificDie>
                </sc.DiceFaceOption>
              );
            })}
          </sc.DiceFaces>
        </div>
        <sc.Button
          onClick={() => {
            toggleBidWindow();
          }}>
          Enter
        </sc.Button>
      </sc.BidWindow>
    </sc.BidWindowContainer>
  );

  return (
    <>
      <div>
        {bidWindow && bidWindowElement}
        <sc.Button
          onClick={
            playerState.currentBid.amount
              ? () => {
                  placeBid();
                }
              : () => {
                  toggleBidWindow();
                }
          }>
          {playerState.currentBid.amount ? 'Place Bid' : 'Set Bid'}
        </sc.Button>
      </div>
    </>
  );
};

export default BidWindow;
