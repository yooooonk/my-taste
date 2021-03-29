import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
  const { is_flex, is_column, width, margin, padding, bg, children } = props;
  const styles = {
    is_flex,
    width,
    margin,
    padding,
    bg,
    is_column
  };

  return <GridBox {...styles}>{children}</GridBox>;
};

Grid.defaultProps = {
  children: null,
  is_flex: false,
  is_column: false,
  width: '100%',
  margin: false,
  padding: false,
  bg: false
};

const GridBox = styled.div`
  //font-family: var(--jua);
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) =>
    props.is_column && props.is_flex
      ? `${props.theme.flex_column}`
      : `${props.theme.flex_row}`}
`;

export default Grid;
