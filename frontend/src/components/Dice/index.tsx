import React from 'react';
import Die0 from '../../atoms/Die/Die0';
import Die1 from '../../atoms/Die/Die1';
import Die2 from '../../atoms/Die/Die2';
import Die3 from '../../atoms/Die/Die3';
import Die4 from '../../atoms/Die/Die4';
import Die5 from '../../atoms/Die/Die5';
import Die6 from '../../atoms/Die/Die6';
import * as sc from './styled';

const DiceComponent = [Die0, Die1, Die2, Die3, Die4, Die5, Die6];

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
          let SpecificDie = DiceComponent[die];
          return (
            <sc.DieContainer key={idx} offset={idx}>
              <SpecificDie />
            </sc.DieContainer>
          );
        })}
      </sc.FirstDice>
      <sc.SecondDice>
        {secondDice.map((die, idx) => {
          let SpecificDie = DiceComponent[die];
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
