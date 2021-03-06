import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { I, Wrapper } from '../elements';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { userActions } from '../redux/modules/user';

import NotiBadge from './NotiBadge';
import styled, { keyframes } from 'styled-components';
import { FaPowerOff, FaKissWinkHeart, FaBars } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import Login from './Login';
import Profile from './Profile';
const Navbar = (props) => {
  const dispatch = useDispatch();

  const [openMenu, setOpenMenu] = useState(false);

  const { isMobile, currentMenu } = useSelector((state) => state.common);

  const logout = (e) => {
    dispatch(userActions.logout());
  };

  const moveToPage = (path) => (e) => {
    setOpenMenu(false);
    history.push(path);
  };

  return (
    <Nav>
      <Wrapper jc="space-between">
        <Logo onClick={() => history.replace('/')}>My Taste,</Logo>
        <Hamburger onClick={() => setOpenMenu(!openMenu)}>
          <FaBars />
        </Hamburger>
      </Wrapper>

      {!isMobile && (
        <Wrapper width="100%" height="100%">
          <Permit not>
            <Login isNav moveSignUpPage={moveToPage('/signup')} />
          </Permit>
          <Permit>
            <Profile />
          </Permit>
        </Wrapper>
      )}
      <Menu isOpen={openMenu}>
        <MenuItem
          currentMenu={currentMenu === 'search'}
          className="search"
          onClick={moveToPage('/search')}
        >
          Search
        </MenuItem>
        <MenuItem
          currentMenu={currentMenu === 'shelf'}
          className="shelf"
          onClick={moveToPage('/basket')}
        >
          Shelf
        </MenuItem>
        <MenuItem
          currentMenu={currentMenu === 'calendar'}
          className="calendar"
          onClick={moveToPage('/calendar')}
        >
          Calendar
        </MenuItem>
        <MenuItem
          currentMenu={currentMenu === 'feed'}
          className="feed"
          onClick={moveToPage('/feed')}
        >
          Feed
        </MenuItem>
      </Menu>
      {isMobile && (
        <Icons isOpen={openMenu}>
          <Permit not>
            <Btns>
              <Tooltip title="로그인">
                <IconButton
                  className="icon"
                  aria-label="delete"
                  onClick={moveToPage('/login')}
                >
                  <FaPowerOff />
                </IconButton>
              </Tooltip>
              <Tooltip title="회원가입">
                <IconButton
                  className="icon"
                  aria-label="delete"
                  onClick={moveToPage('/signup')}
                >
                  <FaKissWinkHeart />
                </IconButton>
              </Tooltip>
            </Btns>
          </Permit>

          <Permit>
            <Btns>
              <Tooltip title="알림">
                <IconButton onClick={moveToPage('/noti')}>
                  <NotiBadge />
                </IconButton>
              </Tooltip>
              <Tooltip title="로그아웃">
                <IconButton
                  aria-label="delete"
                  onClick={() => {
                    setOpenMenu(false);
                    logout();
                  }}
                >
                  <I>
                    <FaPowerOff className="icon" />
                  </I>
                </IconButton>
              </Tooltip>
            </Btns>
          </Permit>
        </Icons>
      )}
    </Nav>
  );
};

Navbar.defaultProps = {};

const Nav = styled.div`
  ${(props) => props.theme.border_box};
  background-color: ${(props) => props.theme.color.gray_light};
  color: #ffeb60;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100vw;

  @media ${(props) => props.theme.desktop} {
    width: 25%;
    margin-right: 4rem;
    border-bottom-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
    height: 85vh;
    justify-content: space-between;
    max-width: 350px;
  }
`;

const Logo = styled.div`
  padding: 1rem;
  cursor: pointer;
  text-align: center;
  font-size: 1.5em;
  font-weight: bold;
  ${(props) => props.theme.flex_column}
  justify-content:center;
  align-items: center;
  color: ${(props) => props.theme.color.navy};

  @media ${(props) => props.theme.desktop} {
    width: 100%;
    height: 20%;
    padding: 3rem 0;
  }
`;

const Menu = styled.div`
  list-style: none;
  cursor: pointer;
  width: 100%;
  color: ${(props) => props.theme.color.gray_light};
  ${(props) => props.theme.flex_column};
  transition: 0.3s all;
  ${(props) => props.theme.border_box};

  @media ${(props) => props.theme.mobile} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
  }

  @media ${(props) => props.theme.tablet} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
  }

  @media ${(props) => props.theme.desktop} {
    align-items: flex-end;
    margin-bottom: 10%;
  }
`;

const MenuItem = styled.span`
  ${(props) => props.theme.flex_row};
  align-items: center;
  width: 100%;
  height: 1.75rem;
  justify-content: center;

  &:hover {
    transform: scale(1.3);
    transform-origin: right;
    font-weight: bold;
  }
  &.search {
    background-color: ${(props) => props.theme.color.yellow};
  }

  &.shelf {
    background-color: ${(props) => props.theme.color.orange};
  }

  &.feed {
    background-color: ${(props) => props.theme.color.blue};
  }

  &.calendar {
    background-color: ${(props) => props.theme.color.green};
  }

  ${(props) =>
    props.currentMenu
      ? `font-weight: 600;
      transform: scale(1.3);
      transform-origin: right;
     `
      : ''}

  @media ${(props) => props.theme.desktop} {
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
    width: 30%;
    padding-left: 1rem;
    margin: 0.25rem 0;
    justify-content: flex-start;
  }
`;

const Icons = styled.div`
  width: 100%;
  ${(props) => props.theme.flex_row};
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
  }

  @media ${(props) => props.theme.tablet} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
  }
`;

const Btns = styled.div`
  & svg {
    font-size: 1rem;
    color: ${(props) => props.theme.color.navy};
  }
  ${(props) => props.theme.flex_row};
  justify-content: center;
  width: 100%;
`;

const Hamburger = styled.div`
  margin: 15px;
  & svg {
    color: ${(props) => props.theme.color.navy};
  }
  @media ${(props) => props.theme.desktop} {
    display: none;
  }
`;

export default Navbar;
