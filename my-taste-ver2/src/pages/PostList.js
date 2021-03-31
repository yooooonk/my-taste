import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../elements';
import Permit from '../shared/Permit';
import Post from '../components/Post';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import InfinityScrollFolDiv from '../shared/InfinityScrollFolDiv';
import styled from 'styled-components';

const PostList = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  const post_list = useSelector((state) => state.post.list);
  const user_info = useSelector((state) => state.user.user);
  const { is_loading, paging } = useSelector((state) => state.post);
  React.useEffect(() => {
    if (post_list.length < 2) {
      dispatch(postActions.getPostFB());
    }
  }, []);
  return (
    <ScrollWrapper>
      <InnerWrapper>
        <InfinityScroll
          _onScroll={() => {
            console.log('gg');
          }}
          callNext={() => {
            dispatch(postActions.getPostFB(paging.next));
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
        </InfinityScroll>
      </InnerWrapper>
    </ScrollWrapper>
  );
};

const ScrollWrapper = styled.div`
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
export default PostList;
