import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Permit from '../shared/Permit';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import Post from '../components/Post';
import styled from 'styled-components';
import { Grid } from '../elements';

const PostDetail = (props) => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);
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
      <Permit>
        <Grid margin="0 3vw">
          <CommentWrite post_id={id} />
        </Grid>
      </Permit>
      <CommentList post_id={id} />
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  background-color: pink;
`;
export default PostDetail;
