import React from 'react';
import styled from 'styled-components';

const Button = (props) => {
  const { _onClick, children, margin, width, height, disabled } = props;

  const styles = { margin, width, height, disabled };
  return (
    <Btn {...styles} disabled={disabled} onClick={_onClick}>
      {children}
    </Btn>
  );
};

Button.defaultProps = {
  _onClick: () => {},
  children: null,
  margin: false,
  width: '100%',
  height: '1.75rem',
  disabled: false
};

const Btn = styled.button`
  border-radius: 5px;
  ${(props) =>
    props.disabled
      ? `background-color:${props.theme.color.gray}; color:${props.theme.color.navy};border-color:${props.theme.color.gray};`
      : `background-color:${props.theme.color.navy}; color:white;  border-color:${props.theme.color.navy}`};
  border: 1px solid;

  text-align: center;
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  cursor: pointer;
  transition: 0.1s;
  padding: 0.25rem;

  &:hover {
    ${(props) =>
      props.disabled
        ? ''
        : `background-color:white; color:${props.theme.color.navy};`}
  }
`;

export default Button;
