import React, { useState, useContext } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const BidWindow = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [bid, setBid] = useState<{ amount: number; face: number }>({
    amount: 0,
    face: 0,
  });
  const [bidWindow, setBidWindow] = useState(false);

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
    socket.emit('place-bid', { bid: bid, room: playerState.room });
    setBid({ amount: 0, face: 0 });
    socket.emit('increment-turn', { room: playerState.room });
  };

  const toggleBidWindow = () => {
    if (!bidWindow || (bidWindow && checkBid(bid))) {
      setBidWindow((prev) => !prev);
    } else {
      alert(
        'not a valid bid. amount must be higher or equal and if equal face must be higher'
      );
    }
  };

  const updateBid = (type: 'face' | 'amount', val: any) => {
    if (type === 'amount') {
      //only accept numbers up to 99
      const reg = new RegExp('^[0-9]{1,2}$|^$');
      if (reg.test(val)) {
        setBid({ ...bid, amount: parseInt(val, 10) });
      }
    } else {
      setBid({ ...bid, face: parseInt(val, 10) });
    }
  };

  let bidWindowElement = (
    <sc.BidWindowContainer>
      <sc.BidWindow>
        <div>
          <div>Amount</div>
          <input
            value={bid.amount || ''}
            onChange={(e) => {
              updateBid('amount', e.target.value);
            }}
          />
        </div>
        <div>
          <div>Face</div>
          <select
            onChange={(e) => {
              updateBid('face', e.target.value);
            }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
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
            bid.amount
              ? () => {
                  placeBid();
                }
              : () => {
                  toggleBidWindow();
                }
          }>
          {bid.amount ? 'Place Bid' : 'Set Bid'}
        </sc.Button>
      </div>
    </>
  );
};

export default BidWindow;
