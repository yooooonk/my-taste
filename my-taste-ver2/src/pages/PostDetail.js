import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Permit from '../shared/Permit';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import Post from '../components/Post';

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
    <React.Fragment>
      {post && (
        <Post
          is_detail
          {...post}
          is_me={post.user_info.user_id === user?.uid}
        />
      )}
      <Permit>
        <CommentWrite post_id={id} />
      </Permit>
      <CommentList post_id={id} />
    </React.Fragment>
  );
};

export default PostDetail;
