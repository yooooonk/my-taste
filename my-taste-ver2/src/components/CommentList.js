import React, { useEffect } from 'react';
import { Grid, Image, Text } from '../elements';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commentActions } from '../redux/modules/comment';

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

  console.log(props);
  return (
    <Grid>
      <Grid width="40%">
        <Image shape="circle" src={user_profile} />
        <Text bold>{user_name}</Text>
      </Grid>
      <Grid margin="0px 4px">
        <Text margin="0px">{contents}</Text>
        <Text margin="0px" size="10px">
          {insert_dt.split(' ')[0]}
        </Text>
      </Grid>
    </Grid>
  );
};

CommentItem.defaultProps = {
  user_profile: '',
  user_name: 'mean0',
  user_id: '',
  post_id: 1,
  contents: '귀여운 고양이네요!',
  insert_dt: '2021-01-01 19:00:00'
};
