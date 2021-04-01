import React from 'react';
import styled from 'styled-components';

const ScrollWrapper = (props) => {
  const { children, callNext, is_next, loading } = props;
  return (
    <OutterWrapper onScroll={() => console.log('되라되ㅏ ㅠ')}>
      <InnerWrapper>{props.children}</InnerWrapper>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  overflow-y: scroll;
  background-color: #f6f6f6;
  width: 100%;
  ${(props) => props.theme.flex_row}
  justify-content:center;
`;

const InnerWrapper = styled.div`
  width: 50%;
  height: 100%;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;

export default ScrollWrapper;
