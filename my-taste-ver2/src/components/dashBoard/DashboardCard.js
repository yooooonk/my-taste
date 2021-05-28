import { useEffect, useState } from 'react';
import { FaHeart, FaPencilAlt, FaBookOpen } from 'react-icons/fa';
import { TiHeart } from 'react-icons/ti';
import styled from 'styled-components';

const DashboardCard = ({ data, type }) => {
  const [title, setTitle] = useState('');

  const item = {
    basketCount: { icon: <FaHeart className="icon shelf" />, title: 'SHELF' },
    isReadCount: {
      icon: <FaBookOpen className="icon read" />,
      title: 'READ'
    },
    isWriteCount: { icon: <FaPencilAlt className="icon post" />, title: 'POST' }
  };

  return (
    <Card type={type}>
      {item[type].icon}
      <Title>{item[type].title}</Title>
      <Data>{data}</Data>
    </Card>
  );
};

const Card = styled.div`
  display: inherit;
  height: 40%;
  margin: 0.5rem;
  width: 20%;
  padding: 1.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.color.navy};
  box-shadow: 3px 3px 20px 0.5px rgb(235, 235, 235);

  & svg {
    font-size: 1.25rem;
  }
  ${(props) => props.theme.border_style};

  ${(props) =>
    props.type === 'basketCount'
      ? `background-color: ${props.theme.color.orange_light}`
      : ``};
  ${(props) =>
    props.type === 'isReadCount'
      ? `background-color: ${props.theme.color.green_light}`
      : ``};
  ${(props) =>
    props.type === 'isWriteCount'
      ? `background-color: ${props.theme.color.navy_light}`
      : ``};

  & .icon.shelf {
    color: ${(props) => props.theme.color.red};
  }
  & .icon.read {
    color: ${(props) => props.theme.color.green};
  }

  & .icon.post {
    color: ${(props) => props.theme.color.navy};
  }

  @media ${(props) => props.theme.desktop} {
    height: 50%;
    width: 30%;
    max-width: 150px;
    margin: 1rem;

    & * {
      margin: 0.25rem;
    }

    & svg {
      font-size: 1.75rem;
    }
  }
`;

const Title = styled.span``;
const Data = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
  @media ${(props) => props.theme.desktop} {
    font-size: 1.75rem;
  }
`;
export default DashboardCard;
