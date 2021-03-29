import React from 'react';
import { Button, Grid } from '../elements';
import Permit from '../shared/Permit';
import Post from './Post';

const PostList = (props) => {
  const { history } = props;
  const post = [
    { user_name: 'yoonk', src: '', contents: '룰루', insertDate: '2021-03-29' },
    { user_name: 'yoonk', src: '', contents: '룰루', insertDate: '2021-03-29' }
  ];
  return (
    <React.Fragment>
      <Grid is_flex is_column>
        {post.map((p, idx) => {
          return (
            <Grid key={idx}>
              카드있음
              <Post {...p} />
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
