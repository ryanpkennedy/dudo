import React, { useContext, useState } from 'react';
import { PlayerContext } from '../../Context/PlayerContext';
import { SocketContext } from '../../Context/SocketProvider';
import * as sc from './styled';

const SettingsWindow = () => {
  const { socket } = useContext(SocketContext);
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const [diceCount, setDiceCount] = useState<number>(5);

  const submitSettings = () => {
    socket.emit('room-settings', {
      room: playerState.room,
      diceCount: diceCount,
    });
  };

  return (
    <sc.SettingsContainer>
      <sc.SettingsWindow>
        <sc.DiceCountControl>
          <div>Dice Count</div>
          <select
            value={diceCount}
            onChange={(e) => {
              setDiceCount(parseInt(e.target.value));
            }}>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
        </sc.DiceCountControl>
        <sc.Enter
          onClick={() => {
            submitSettings();
          }}>
          Enter
        </sc.Enter>
      </sc.SettingsWindow>
    </sc.SettingsContainer>
  );
};

export default SettingsWindow;
