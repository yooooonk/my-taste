import React from 'react';
import { Grid, Text, Image } from '../elements';
import { history } from '../redux/configStore';
const Card = (props) => {
  const { image_url, user_name, post_id, type, id } = props;

  return (
    <Grid
      _onClick={() => {
        history.push(`/post/${post_id}`);
        //list에서 삭제
      }}
      padding="16px"
      is_flex
      bg="#ffffff"
      margin="8px 0px"
    >
      <Grid width="auto" margin="0px 8px 0px 0px">
        <Image src={image_url} size="85px" shape="square" />
      </Grid>
      <Grid>
        <Text>
          {type === 'like' && (
            <span>
              <b>{user_name}</b>님이 게시글을 좋아합니다 :)
            </span>
          )}
          {type === 'comment' && (
            <span>
              <b>{user_name}</b>님이 게시글에 댓글을 남겼습니다 :)
            </span>
          )}
        </Text>
      </Grid>
    </Grid>
  );
};

Card.defaultProps = {
  image_url: 'http://via.placeholder.com/400x300'
};

export default Card;
