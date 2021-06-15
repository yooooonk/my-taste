import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/post/Post';
import { postActions } from '../redux/modules/post';
import { commonActions } from '../redux/modules/common';
import _ from 'lodash';
import styled from 'styled-components';
import PulseLoader from 'react-spinners/PulseLoader';
import { css } from '@emotion/react';

const PostList = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const { is_loading } = useSelector((state) => state.post);

  useEffect(() => {
    console.log('%c 💗Feed💗', 'color: rgb(0, 0, 0); font-size: 16px');
    console.log('책을 기록한 Feed입니다');
    console.log('다른 사람들이 쓴 글도 볼 수 있어요');

    dispatch(commonActions.setCurrentMenu('feed'));
    if (post_list.length < 2) {
      dispatch(postActions.fetchPosts());
    }

    return () => {
      dispatch(commonActions.setCurrentMenu(null));
    };
  }, []);

  const onScroll = _.throttle((e) => {
    if (is_loading) return;

    const scrollPer = Math.floor(
      (e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)) *
        100
    );
    if (scrollPer > 80) {
      dispatch(postActions.fetchPosts());
    }
  }, 300);

  return (
    <Container onScroll={onScroll}>
      <PulseLoader loading={is_loading} css={spinnerStyle} color="#3a5378" />
      {post_list.map((p, idx) => {
        console.log(p);
        return (
          <Post
            {...p}
            _onClick={() => history.push(`/post/${p.id}`)}
            key={idx}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.flex_row};
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.blue};
  padding: 1.5rem;
  ${(props) => props.theme.border_box};

  &::-webkit-scrollbar {
    display: none;
  }
`;
const spinnerStyle = css`
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export default PostList;
