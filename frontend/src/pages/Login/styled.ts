import styled from 'styled-components';

export const LoginInput = styled.input``;

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
  padding: 8px;
  margin: 16px;
  border: solid 1px gray;
  cursor: pointer;
  border-radius: 8px;
`;
