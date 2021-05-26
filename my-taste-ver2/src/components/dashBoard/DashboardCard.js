import { useEffect, useState } from 'react';
import { FaHeart, FaPencilAlt, FaBookReader } from 'react-icons/fa';
import styled from 'styled-components';

const DashboardCard = ({ data, type }) => {
  const [title, setTitle] = useState('');

  const item = {
    basketCount: { icon: <FaHeart className="icon shelf" />, title: 'SHELF' },
    isReadCount: {
      icon: <FaBookReader className="icon read" />,
      title: 'READ'
    },
    isWriteCount: { icon: <FaPencilAlt className="icon post" />, title: 'POST' }
  };

  return (
    <Card>
      {item[type].icon}
      <Title>{item[type].title}</Title>
      <Data>{data}</Data>
    </Card>
  );
};

const Card = styled.div`
  display: inherit;
  width: 30%;
  height: 100%;
  margin: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  box-shadow: 3px 3px 20px 0.5px rgb(235, 235, 235);

  & span {
    margin-top: 0.5rem;
  }

  & .icon.shelf {
    color: rgb(107, 104, 255);
  }
  & .icon.read {
    color: rgb(250, 98, 255);
  }

  & .icon.post {
    color: rgb(16, 196, 0);
  }
`;

const Title = styled.span``;
const Data = styled.span``;
export default DashboardCard;
