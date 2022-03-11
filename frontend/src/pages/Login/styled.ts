import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 16px;
  /* flex-direction: column; */
  align-items: center;
`;

export const InputField = styled.div`
  display: flex;
  margin-right: 16px;
  /* justify-content: center; */
`;

export const InputValue = styled.input`
  width: 150px;
  padding: 4px 8px;
`;

export const AvatarSelectionContainer = styled.div`
  display: flex;
`;

export const AvatarContainer = styled('div')<{ selected: boolean }>`
  padding: 24px;
  background: ${(props) =>
    props.selected === true ? 'rgba(125,250,125,0.25)' : 'none'};
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

export const SubmitButton = styled.div`
  width: 200px;
  padding: 4px 8px;
  margin: auto;
  border: solid 1px gray;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: center;
`;
