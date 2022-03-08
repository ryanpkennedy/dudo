import React, { useContext, useState } from 'react';
import * as sc from './styled';
import Male from '../../atoms/Avatar/Male';
import Female from '../../atoms/Avatar/Female';
import { GameContext } from '../../Context/GameContext';
import { SocketContext } from '../../Context/SocketProvider';
import { PlayerContext } from '../../Context/PlayerContext';

const Login = () => {
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [avatarSelection, setAvatarSelection] = useState<
    'male' | 'female' | undefined
  >();
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const selectAvatar = (type: 'male' | 'female') => {
    setAvatarSelection(type);
  };

  const handleUsername = (e: any) => {
    let usernameVal = e.target.value.replace(' ', '');
    if (usernameVal.length > 10) {
      usernameVal = usernameVal.slice(0, 10);
    }
    setUsername(usernameVal);
  };

  const handleRoom = (e: any) => {
    let roomVal = e.target.value.replace(' ', '');
    if (roomVal.length > 8) {
      roomVal = roomVal.slice(0, 8);
    }
    setRoom(roomVal);
  };

  const checkForm = () => {
    if (avatarSelection && username !== '' && room !== '') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    let formCheck = checkForm();
    if (!formCheck) {
      alert('missing something');
    } else {
      let tempState = {
        ...playerState,
        avatar: avatarSelection,
        username: username,
        room: room,
      };
      socket.emit(
        'login',
        { username, avatarSelection, room },
        (response: any) => {
          if (response.status === '200') {
            console.log('login success');
            localStorage.setItem('id', `${room}_${username}`);
            //@ts-ignore
            setPlayerState(tempState);
          } else {
            alert(response.status);
          }
        }
      );
      console.log('submit');
    }
  };

  return (
    <>
      <div>Enter Username</div>
      <sc.LoginInput
        onChange={(e) => {
          handleUsername(e);
        }}
        value={username}></sc.LoginInput>

      <div>Select Avatar</div>
      <sc.AvatarSelectionContainer>
        <sc.AvatarContainer
          selected={avatarSelection === 'male'}
          onClick={() => selectAvatar('male')}>
          <Male></Male>
        </sc.AvatarContainer>
        <sc.AvatarContainer
          selected={avatarSelection === 'female'}
          onClick={() => selectAvatar('female')}>
          <Female></Female>
        </sc.AvatarContainer>
      </sc.AvatarSelectionContainer>

      <div>Enter Room Name</div>
      <sc.LoginInput
        onChange={(e) => {
          handleRoom(e);
        }}
        value={room}></sc.LoginInput>

      <sc.SubmitButton
        onClick={() => {
          handleSubmit();
        }}>
        submit
      </sc.SubmitButton>
    </>
  );
};

export default Login;
