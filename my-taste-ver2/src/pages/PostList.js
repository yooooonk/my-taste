import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../elements';
import Permit from '../shared/Permit';
import Post from '../components/post/Post';
import { postActions } from '../redux/modules/post';
import { commonActions } from '../redux/modules/common';

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
  return (
    <ScrollWrapper
      callNext={() => {
        dispatch(postActions.fetchPosts());
      }}
      is_next={paging.next ? true : false}
      loading={is_loading}
    >
      {post_list.map((p, idx) => {
        return (
          <Grid key={idx} _onClick={() => history.push(`/post/${p.id}`)}>
            <Post {...p} />
          </Grid>
        );
      })}
    </ScrollWrapper>
  );
};

/* const ScrollWrapper = styled.div`
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
`; */
export default PostList;
