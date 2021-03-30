import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid } from '../elements';
import Permit from '../shared/Permit';
import Post from './Post';
import { actionCreators as postActions } from '../redux/modules/post';

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
    <React.Fragment>
      <Grid is_flex is_column>
        {post_list.map((p, idx) => {
          console.log(p);
          return (
            <Grid key={idx} _onClick={() => history.push(`/post/${p.id}`)}>
              <Post
                {...p}
                is_me={user_info && p.user_info.user_id === user_info.uid}
              />
            </Grid>
          );
        })}
      </Grid>
      <Permit>
        <Button
          _onClick={() => {
            history.push('/write');
          }}
        >
          +
        </Button>
      </Permit>
    </React.Fragment>
  );
};

export default PostList;
