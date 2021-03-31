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
    <Grid is_flex is_column>
      <Header goBack={props.is_detail}>
        <Grid>
          <Image is_circle src={props.user_profile}></Image>
          <Text bold>{props.user_info.user_name}</Text>
        </Grid>
        <Grid></Grid>
        <Grid></Grid>
        <Grid width="70px" margin="0 20px">
          {is_me && (
            <Grid>
              <I
                size="1em"
                color="#7d7d7d"
                _onClick={(e) => {
                  editPost(e);
                }}
              >
                <MdCreate />
              </I>
              <I
                size="1em"
                color="#7d7d7d"
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

      <ImageCarousel image={props.image_url} phraseList={props.phraseList} />

      <Grid>
        <Grid margin="0 3px">
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
      </Grid>
      <Grid margin="0 3px" padding="0 3px">
        {props.contents.length > 20 && isMore
          ? props.contents.substring(0, 20) + '...'
          : props.contents}
      </Grid>
      <i onClick={() => setIsMore(!isMore)}>
        {props.contents.length > 20 ? (
          isMore ? (
            <Text size="13px" color="gray">
              더보기
            </Text>
          ) : (
            <Text size="13px" color="gray">
              접기
            </Text>
          )
        ) : (
          ''
        )}
      </i>
    </Grid>
  );
};

Post.defaultProps = {
  is_detail: false
};

export default Post;
