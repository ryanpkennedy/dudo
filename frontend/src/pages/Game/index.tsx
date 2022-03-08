import React, { useContext, useState } from 'react';
import { GameContext } from '../../Context/GameContext';
import { PlayerContext } from '../../Context/PlayerContext';
import Avatar from '../../atoms/Avatar';
import * as sc from './styled';

const Game = () => {
  const { gameState, setGameState } = useContext(GameContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const userArray = Object.getOwnPropertyNames(gameState?.users);

  const [diceArray, setDiceArray] = useState<number[]>([]);

  let diceRemaining = 6;

  const handleRoll = () => {
    console.log('rolling dice');
    let tempDice = [];
    for (let i = 0; i < diceRemaining; i++) {
      console.log('loop iteration');
      let dieValue = Math.floor(Math.random() * 6);
      tempDice.push(dieValue);
    }
    setDiceArray([...tempDice]);
    console.log('resulting dice array: ', diceArray);
  };

  return (
    <>
      Game
      <sc.RollButton
        onClick={() => {
          handleRoll();
        }}>
        Roll
      </sc.RollButton>
      <sc.DiceContainer>
        {diceArray.map((num) => {
          return <sc.Die key={Math.random()}>{num}</sc.Die>;
        })}
      </sc.DiceContainer>
    </>
  );
};

export default Game;
