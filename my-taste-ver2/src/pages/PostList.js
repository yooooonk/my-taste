import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../elements';
import Permit from '../shared/Permit';
import Post from '../components/post/Post';
import { postActions } from '../redux/modules/post';
import { commonActions } from '../redux/modules/common';
import _ from 'lodash';
import styled from 'styled-components';
import ScrollWrapper from '../shared/ScrollWrapper';

const PostList = (props) => {
  const { isMobile } = useSelector((state) => state.common);
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const { is_loading, paging } = useSelector((state) => state.post);

  useEffect(() => {
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
      {post_list.map((p, idx) => {
        return (
          <Grid key={idx} _onClick={() => history.push(`/post/${p.id}`)}>
            <Post {...p} />
          </Grid>
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

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default PostList;
