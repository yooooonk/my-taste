import React, { useState } from 'react';
import { Grid, I, Image, Text } from '../elements';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import ImageCarousel from './ImageCarousel';
import Permit from '../shared/Permit';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { MdKeyboardArrowLeft, MdCreate, MdDelete } from 'react-icons/md';
import { history } from '../redux/configStore';
import Header from './Header';
const Post = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user?.uid);
  const is_me = props.user_info.user_id === id;
  const [isMore, setIsMore] = useState(true);
  let like = props.likers.includes(id);
  const onUnlike = (e) => {
    e.stopPropagation();
    dispatch(postActions.unlikePostFB(props.id));
  };

  const onLike = (e) => {
    e.stopPropagation();
    dispatch(postActions.likePostFB(props.id));
  };

  const editPost = (e) => {
    e.stopPropagation();
    history.push(`/write/${props.id}`);
  };

  const deletePost = (e) => {
    e.stopPropagation();
    dispatch(postActions.deletePostFB(props.id));
  };
  return (
    <Grid is_flex is_column bg="skyblue" margin="10px 0">
      <Header goBack={props.is_detail}>
        <Grid width="30%">
          <Image is_circle src={props.user_profile}></Image>
          <Text>{props.user_info.user_name}</Text>
        </Grid>
        <Grid margin="0 20px" width="10%" bg="skyblue">
          {is_me && (
            <Grid>
              <I
                _onClick={(e) => {
                  editPost(e);
                }}
              >
                <MdCreate />
              </I>
              <I
                _onClick={(e) => {
                  deletePost(e);
                }}
              >
                <MdDelete />
              </I>
            </Grid>
          )}
        </Grid>
      </Header>

      <Grid bg="yellow">
        <ImageCarousel
          size="100%"
          image={props.image_url}
          phraseList={props.phraseList}
        />
      </Grid>
      <Grid>
        <Text>댓글 {props.comment_cnt}개</Text>
        <Permit>
          {like ? (
            <I color="red">
              <MdFavorite
                onClick={(e) => {
                  onUnlike(e);
                }}
              />
            </I>
          ) : (
            <I color="pink">
              <MdFavoriteBorder
                onClick={(e) => {
                  onLike(e);
                }}
              />
            </I>
          )}
        </Permit>
      </Grid>
      <Grid is_flex is_column>
        {props.contents.length > 20 && isMore
          ? props.contents.substring(0, 20) + '...'
          : props.contents}
        <span style={{ display: 'inline' }} onClick={() => setIsMore(!isMore)}>
          {props.contents.length > 20 ? (isMore ? '더보기' : '접기') : ''}
        </span>
      </Grid>
    </Grid>
  );
};

Post.defaultProps = {
  is_detail: false
};

export default Post;
