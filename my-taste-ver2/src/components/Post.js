import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, I, Image, Text } from '../elements';
import { MdEdit } from 'react-icons/md';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import ImageCarousel from './ImageCarousel';
import styled from 'styled-components';
import { Icon } from '@material-ui/core';
import Permit from '../shared/Permit';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';

const Post = (props) => {
  //const { _onClck } = props;
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user.uid);

  let like = props.likers.includes(id);

  const onUnlike = (e) => {
    e.stopPropagation();
    dispatch(postActions.unlikePostFB(props.id));
  };

  const onLike = (e) => {
    e.stopPropagation();
    dispatch(postActions.likePostFB(props.id));
  };
  return (
    <Grid is_flex is_column bg="skyblue" margin="10px 0">
      <Grid is_flex>
        <Grid width="25%">
          <Image is_circle src={props.user_profile}></Image>
          <Text>{props.user_info.user_name}</Text>
        </Grid>
        <Grid width="10%" bg="skyblue">
          <Text>{props.is_me && <MdEdit />}</Text>
        </Grid>
      </Grid>
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
                className="icon unlike"
                onClick={(e) => {
                  onLike(e);
                }}
              />
            </I>
          )}
        </Permit>
      </Grid>
    </Grid>
  );
};

Post.defaultProps = {
  is_me: false
};

export default Post;
