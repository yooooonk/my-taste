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
  height: '25px',
  disabled: false
};

const Btn = styled.button`
  border-radius: 10px;
  background-color: white;
  border: 1px solid var(--main-color);
  border-color: ${(props) =>
    props.disabled ? 'gray' : props.theme.main_color};
  text-align: center;
  color: ${(props) => (props.disabled ? 'gray' : props.theme.main_color)};
  width: ${(props) => props.width};
  height: ${(props) => props.heigth};
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  cursor: pointer;

  &:hover {
    ${(props) =>
      props.disabled
        ? ''
        : `background-color:${props.theme.main_color}; color:white;`}
  }
`;

export default Button;
