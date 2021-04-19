import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Permit from '../shared/Permit';
import CommentList from '../components/post/CommentList';
import CommentWrite from '../components/post/CommentWrite';
import Post from '../components/post/Post';
import styled from 'styled-components';
import { Grid, Wrapper } from '../elements';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
  const { isMobile } = useSelector((state) => state.view);
  const id = props.match.params.id;
  const idx = list.findIndex((p) => p.id === id);
  const post = list[idx];

  React.useEffect(() => {
    if (post) return;
    dispatch(postActions.getOnePostFB(id));
  });
  return (
    <DetailWrapper>
      {post && (
        <Post
          is_detail
          {...post}
          is_me={post.user_info.user_id === user?.uid}
        />
      )}
      <Wrapper is_column>
        <Permit>
          <Wrapper width={isMobile ? '97vw' : '40vw'}>
            <CommentWrite post_id={id} />
          </Wrapper>
        </Permit>
        <CommentList post_id={id} />
      </Wrapper>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  background-color: pink;
`;
export default PostDetail;
