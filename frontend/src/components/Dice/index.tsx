import React from 'react';
import * as sc from './styled';
import { DiceArray } from '../../atoms/DiceArray';

interface DiceProps {
  dice: number[];
}

const Dice: React.FC<DiceProps> = ({ dice }) => {
  let newDice = [...dice];
  let firstDice: number[] = [];
  let secondDice: number[] = [];
  while (newDice.length > 0) {
    //@ts-ignore
    firstDice.push(newDice.shift());
    //@ts-ignore
    secondDice.push(newDice.shift());
  }

  return (
    <sc.DiceContainer>
      <sc.FirstDice>
        {firstDice.map((die, idx) => {
          let SpecificDie = DiceArray[die];
          return (
            <sc.DieContainer key={idx} offset={idx}>
              <SpecificDie />
            </sc.DieContainer>
          );
        })}
      </sc.FirstDice>
      <sc.SecondDice>
        {secondDice.map((die, idx) => {
          let SpecificDie = DiceArray[die];
          return (
            <sc.DieContainer key={idx} offset={idx}>
              <SpecificDie />
            </sc.DieContainer>
          );
        })}
      </sc.SecondDice>
    </sc.DiceContainer>
  );
};

export default Dice;
