import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import styled from 'styled-components';
import { css } from '@emotion/react';
import PulseLoader from 'react-spinners/PulseLoader';

const ScrollWrapper = (props) => {
  const { callNext, is_next, loading } = props;

  const handleScrollForMobile = _.throttle((e) => {
    if (loading) return;

    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    if (scrollHeight - innerHeight - scrollTop < 200) {
      callNext();
    }
  }, 300);

  const handleScrollForDesktop = _.throttle((e) => {
    if (loading) return;

    const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );
    if (scrollPer > 80) {
      callNext();
    }
  }, 300);

  useEffect(() => {
    if (loading) return;
    if (is_next) {
      window.addEventListener('scroll', handleScrollForMobile);
    } else {
      window.removeEventListener('scroll', handleScrollForMobile);
    }
    return () => {
      window.removeEventListener('scroll', handleScrollForMobile);
    };
  }, [is_next, loading]);

  return (
    <OutterWrapper onScroll={handleScrollForDesktop}>
      <InnerWrapper>
        {props.children}
        <PulseLoader loading={is_next} css={override} color="pink" />
      </InnerWrapper>
    </OutterWrapper>
  );
};

ScrollWrapper.defaultProps = {
  width: '100%'
};

const OutterWrapper = styled.div`
  overflow-y: scroll;
  //background-color: ${(props) => props.theme.main_white};
  width: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default ScrollWrapper;
