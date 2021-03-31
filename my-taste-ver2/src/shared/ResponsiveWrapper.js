import React from 'react';
import styled from 'styled-components';

const ResponsiveWrapper = ({ children, dt_width }) => {
  return <Wrapper dt_width={dt_width}>{children}</Wrapper>;
};

ResponsiveWrapper.defaultProps = {
  dt_width: '40vw'
};

const Wrapper = styled.div`
  background-color: yellow;
  height: 100%;

  width: ${(props) => props.dt_width};
  ${(props) => props.theme.flex_column}
  justify-content:center;

  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;
export default ResponsiveWrapper;
