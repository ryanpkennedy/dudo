import React, { useContext, useState } from 'react';
import * as sc from './styled';
import { SocketContext } from '../../Context/SocketProvider';
import { PlayerContext } from '../../Context/PlayerContext';
import CoverPic from '../../atoms/CoverPic';

const Login = () => {
  const { playerState, setPlayerState } = useContext(PlayerContext);
  const { socket } = useContext(SocketContext);
  const [avatarSelection, setAvatarSelection] = useState<
    'male' | 'female' | undefined
  >('male');

  const selectAvatar = (type: 'male' | 'female') => {
    setAvatarSelection(type);
  };

  const handleUsername = (e: any) => {
    let usernameVal = e.target.value.replace(' ', '');
    usernameVal = usernameVal.toUpperCase();
    if (usernameVal.length > 10) {
      usernameVal = usernameVal.slice(0, 10);
    }
    setPlayerState({ ...playerState, username: usernameVal });
  };

  const handleRoom = (e: any) => {
    let roomVal = e.target.value.replace(' ', '');
    roomVal = roomVal.toUpperCase();
    if (roomVal.length > 8) {
      roomVal = roomVal.slice(0, 8);
    }
    setPlayerState({ ...playerState, room: roomVal });
  };

  const checkForm = (username: string | '', room: string | '') => {
    if (avatarSelection && username !== '' && room !== '') {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = async (username: string | '', room: string | '') => {
    localStorage.setItem('id', `${room}_${username}`);
    let formCheck = checkForm(username, room);
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
            socket.emit('update-all', { room });
            console.log('(Login) tempState before update: ', tempState);
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
      <sc.CoverPicContainer>
        <CoverPic></CoverPic>
      </sc.CoverPicContainer>
      <sc.InputContainer>
        <sc.InputField>Username</sc.InputField>
        <sc.InputValue
          onChange={(e) => {
            handleUsername(e);
          }}
          value={playerState.username || ''}></sc.InputValue>
      </sc.InputContainer>

      <sc.InputContainer>
        <sc.InputField>Room Name</sc.InputField>
        <sc.InputValue
          onChange={(e) => {
            handleRoom(e);
          }}
          value={playerState.room || ''}></sc.InputValue>
      </sc.InputContainer>

      <sc.SubmitButton
        onClick={() => {
          handleSubmit(playerState.username || '', playerState.room || '');
        }}>
        Join
      </sc.SubmitButton>
    </>
  );
};

export default Login;
