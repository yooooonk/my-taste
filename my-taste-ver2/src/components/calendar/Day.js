import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Day = (props) => {
  const { dateInfo, className } = props;
  const schedule = dateInfo.currentSch;
  const dispatch = useDispatch();

  schedule.sort((a, b) => a.time - b.time);
  const mapToPlan = schedule.map((s, idx) => {
    return (
      <Read key={idx} className={`${s.completed ? 'completed' : ''}`} data={s}>
        <Thumbnail src={s.thumbnail} alt="thumbnail" />
      </Read>
    );
  });

  return (
    <D className={className}>
      <span className="title">{dateInfo.day}</span>
      {mapToPlan}
    </D>
  );
};

const D = styled.div`
  padding-top: 4px;
  height: 12vh;
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow: hidden;

  &.grayed {
    color: gray;
  }

  &.today > .title {
    color: white;
    background-color: ${(props) => props.theme.color.green};
  }

  & > .title {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 30px;
    height: 30px;
  }
`;

const Read = styled.span`
  text-align: center;
  font-size: 0.8em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 1px 0;
  height: 100%;
  width: 100%;
  border-radius: 7px;
  background-color: ${(props) => props.theme.color.green_light};
  color: white;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  height: 150%;
`;

export default Day;
