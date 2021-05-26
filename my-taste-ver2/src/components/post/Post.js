import React, { useState } from 'react';
import { Grid, I, Image, Text, Wrapper } from '../../elements';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import ImageCarousel from '../ImageCarousel';
import Permit from '../../shared/Permit';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../../redux/modules/post';
import { MdCreate, MdDelete } from 'react-icons/md';
import { history } from '../../redux/configStore';
import Header from '../Header';
import styled from 'styled-components';
const Post = (props) => {
  const { user_info, basketId, id } = props;

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.user?.uid);
  const { isMobile, layout } = useSelector((state) => state.view);

  const is_me = user_info.user_id === uid;
  const [isMore, setIsMore] = useState(true);
  let like = props.likers.includes(uid);
  const onUnlike = (e) => {
    e.stopPropagation();
    dispatch(postActions.unlikePostFB(id));
  };

  const onLike = (e) => {
    e.stopPropagation();
    dispatch(postActions.likePostFB(id));
  };

  const editPost = (e) => {
    e.stopPropagation();
    history.push(`/edit/${id}`);
  };

  const deletePost = (e) => {
    e.stopPropagation();

    dispatch(postActions.fetchDeletePost(id, basketId));
  };
  return (
    <PostWrapper>
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
      <Wrapper is_column width="100%">
        <ImageCarousel image={props.image_url} phraseList={props.phraseList} />

        <Wrapper>
          <Wrapper jc="space-between" padding="0 2vw">
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
          </Wrapper>
        </Wrapper>
        <Wrapper>
          <Grid jc="space-between" padding="0 2vw">
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
      {/*     {layout === 'top-bottom' && (
        <Wrapper is_column>
          <ImageCarousel
            image={props.image_url}
            phraseList={props.phraseList}
          />

          <Wrapper>
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
          </Wrapper>
          <Wrapper>
            <Grid>
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
            <Wrapper is_column>
              {props.contents.length > 20 && isMore
                ? props.contents.substring(0, 20) + '...'
                : props.contents}

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
        </Wrapper>
      )}
      {layout === 'reverse-row' && (
        <Wrapper is_column={isMobile}>
          <Wrapper ai="flex-start">
            <Wrapper is_column>
              {props.contents.length > 20 && isMore
                ? props.contents.substring(0, 20) + '...'
                : props.contents}

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
      )} */}
    </PostWrapper>
  );
};

Post.defaultProps = {
  is_detail: false
};

const PostWrapper = styled.div`
  ${(props) => props.theme.flex_column};
  max-width: 650px;
`;

export default Post;
