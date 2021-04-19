import React, { useEffect } from 'react';
import { Grid, Image, Text, Wrapper } from '../../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../../redux/modules/comment';

const CommentList = (props) => {
  const dispatch = useDispatch();
  const comment_list = useSelector((state) => state.comment.list);
  const { post_id } = props;
  useEffect(() => {
    if (!comment_list[post_id]) {
      dispatch(commentActions.getCommentFB(post_id));
    }
  }, []);
  if (!comment_list[post_id] || !post_id) {
    return null;
  }
  return (
    <React.Fragment>
      <Grid is_flex is_column padding="16px">
        {comment_list[post_id].map((c) => {
          return <CommentItem key={c.id} {...c} />;
        })}
      </Grid>
    </React.Fragment>
  );
};

export default CommentList;

const CommentItem = (props) => {
  const {
    user_profile,
    user_name,
    user_id,
    post_id,
    contents,
    insert_dt
  } = props;
  return (
    <Wrapper jc="space-between">
      <Wrapper jc="flex-start">
        <Image is_circle src={user_profile} />
        <Text bold>{user_name}</Text>
      </Wrapper>
      <Wrapper jc="space-between" width="300%">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px" size="10px">
          {insert_dt.split(' ')[0]}
        </Text>
      </Wrapper>
    </Wrapper>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'mean0',
  user_id: '',
  post_id: 1,
  contents: '귀여운 고양이네요!',
  insert_dt: '2021-01-01 19:00:00',
  src:
    'https://firebasestorage.googleapis.com/v0/b/my-taste-e6d3f.appspot.com/o/noImage.png?alt=media&token=fc22498a-b954-42db-9683-5a958795adb0'
};
