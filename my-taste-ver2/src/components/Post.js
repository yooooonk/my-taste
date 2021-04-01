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
import styled from 'styled-components';
import Wrapper from '../elements/Wrapper';
const Post = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.user?.uid);
  const { isMobile, layout } = useSelector((state) => state.view);

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
    <Wrapper is_column>
      <Header goBack={props.is_detail}>
        <Wrapper jc="flex-start">
          <Image is_circle src={props.user_profile}></Image>
          <Text bold>{props.user_info.user_name}</Text>
        </Wrapper>
        <Wrapper width="70px" margin="0 20px">
          {is_me && (
            <Wrapper>
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
            </Wrapper>
          )}
        </Wrapper>
      </Header>
      {layout === 'top-bottom' && (
        <Wrapper is_column>
          <ImageCarousel
            image={props.image_url}
            phraseList={props.phraseList}
          />

          <Grid>
            <Grid margin="0 2vw">
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
          <Wrapper>
            <Grid margin="0 3px" padding="0 2vw">
              {props.contents.length > 20 && isMore
                ? props.contents.substring(0, 20) + '...'
                : props.contents}
            </Grid>
            <i
              onClick={(e) => {
                e.stopPropagation();
                setIsMore(!isMore);
              }}
            >
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
          </Wrapper>
        </Wrapper>
      )}
      {layout === 'bottom-top' && (
        <Wrapper is_column>
          <Grid margin="0 3px" padding="0 2vw">
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
          <ImageCarousel
            image={props.image_url}
            phraseList={props.phraseList}
          />

          <Grid>
            <Grid margin="0 2vw">
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
        </Wrapper>
      )}
      {layout === 'row' && (
        <Wrapper is_column={isMobile}>
          <Wrapper is_column>
            <ImageCarousel
              image={props.image_url}
              phraseList={props.phraseList}
            />

            <Grid>
              <Grid margin="0 2vw">
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
          </Wrapper>
          <Wrapper ai="flex-start">
            <Wrapper>
              {props.contents.length > 20 && isMore
                ? props.contents.substring(0, 20) + '...'
                : props.contents}
            </Wrapper>
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
          </Wrapper>
        </Wrapper>
      )}
      {layout === 'reverse-row' && (
        <Wrapper is_column={isMobile}>
          <Wrapper ai="flex-start">
            <Wrapper>
              {props.contents.length > 20 && isMore
                ? props.contents.substring(0, 20) + '...'
                : props.contents}
            </Wrapper>
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
          </Wrapper>
          <Wrapper is_column>
            <ImageCarousel
              image={props.image_url}
              phraseList={props.phraseList}
            />

            <Grid>
              <Grid margin="0 2vw">
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
          </Wrapper>
        </Wrapper>
      )}
    </Wrapper>
  );
};

Post.defaultProps = {
  is_detail: false
};

const PostWrapper = styled.div``;

export default Post;
