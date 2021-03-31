import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { I } from '../elements';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { actionCreators as userActions } from '../redux/modules/user';
import NotiBadge from './NotiBadge';
import styled from 'styled-components';
import { FaAppleAlt, FaPowerOff, FaKissWinkHeart } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
const Navbar = (props) => {
  const dispatch = useDispatch();

  const logout = (e) => {
    dispatch(userActions.logoutFB());
  };
  return (
    <React.Fragment>
      <Nav>
        <Title onClick={() => history.push('/')}>
          <FaAppleAlt />
          My Taste
        </Title>
        <Menu>
          <span onClick={() => history.push('/')}>feed</span>
          <Permit>
            <span onClick={() => history.push('/write')}>write</span>
          </Permit>

          {/* <div>basket</div>
          <div>search</div> */}
        </Menu>

        <Permit not>
          <Btns>
            <Tooltip title="로그인">
              <IconButton
                className="icon"
                aria-label="delete"
                onClick={() => history.push('/login')}
              >
                <FaPowerOff />
              </IconButton>
            </Tooltip>
            <Tooltip title="회원가입">
              <IconButton
                className="icon"
                aria-label="delete"
                onClick={() => history.push('/signup')}
              >
                <FaKissWinkHeart />
              </IconButton>
            </Tooltip>
          </Btns>
        </Permit>

        <Permit>
          <Btns>
            <Tooltip title="알림">
              <IconButton onClick={() => history.push('/noti')}>
                <NotiBadge className="icon" />
              </IconButton>
            </Tooltip>
            <Tooltip title="로그아웃">
              <IconButton aria-label="delete" onClick={logout}>
                <FaPowerOff className="icon" />
              </IconButton>
            </Tooltip>
          </Btns>
        </Permit>
      </Nav>
    </React.Fragment>
  );
};

Navbar.defaultProps = {};

const Nav = styled.div`
  color: ${(props) => props.theme.main_white};
  font-family: var(--ballo);

  & .icon {
    margin: 10px;
    transition: 0.3s all;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
  @media ${(props) => props.theme.mobile} {
    ${(props) => props.theme.flex_row}
  }

  @media ${(props) => props.theme.tablet} {
    ${(props) => props.theme.flex_row}
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_column}
    align-items:center;
    padding: 20px;
    width: 20%;
    height: 90%;
  }
`;

const Title = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 3.5vw;
  line-height: 3.5vw;
  margin: 5px 20px;
  ${(props) => props.theme.flex_column}
  justify-content:center;
  align-items: center;
  color: ${(props) => props.theme.main_white};

  @media ${(props) => props.theme.mobile} {
    ${(props) => props.theme.flex_row}
  }
`;

const Menu = styled.div`
  transition: 0.3s;
  font-size: 3vw;
  cursor: pointer;
  &:hover {
    transform: skew(-15deg);
  }
  @media ${(props) => props.theme.mobile} {
    ${(props) => props.theme.flex_row}
  }

  @media ${(props) => props.theme.tablet} {
    ${(props) => props.theme.flex_row}
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_column};
    justify-content: center;
  }
`;

const Btns = styled.div`
  ${(props) => props.theme.flex_row}
`;

export default Navbar;
