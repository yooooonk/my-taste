import React from 'react';
import { MdClose } from 'react-icons/md';
import { Grid, I } from '../../elements';
import styled from 'styled-components';
import ErrorMsg from '../ErrorMsg';
import Wrapper from '../../elements/Wrapper';
import { useSelector } from 'react-redux';

const PhraseList = (props) => {
  const { phraseList, _onClick } = props;
  const { isMobile } = useSelector((state) => state.view);
  return (
    <Wrapper is_column>
      {phraseList?.map((p, idx) => {
        return (
          <Grid key={idx}>
            <Phrase>{p}</Phrase>
            <I color="gray">
              <MdClose onClick={_onClick} />
            </I>
          </Grid>
        );
      })}
      <ErrorMsg valid={phraseList.length >= 10}>
        10개까지만 추가할 수 있어요
      </ErrorMsg>
    </Wrapper>
  );
};

PhraseList.defaultProps = {
  _onClick: () => {},
  phraseList: []
};

const Phrase = styled.div`
  border-radius: 10px;
  background-color: #ffe9ed;
  padding: 0 10px;
  width: 100%;
  height: 100%;
  margin: 1px 0;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export default PhraseList;