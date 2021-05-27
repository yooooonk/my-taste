import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { I } from '../elements';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as viewActions } from '../redux/modules/view';
import NotiBadge from './NotiBadge';
import styled, { keyframes } from 'styled-components';
import {
  FaAppleAlt,
  FaPowerOff,
  FaKissWinkHeart,
  FaBars
} from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import Login from './Login';
const Navbar = (props) => {
  const dispatch = useDispatch();

  const { isMobile } = useSelector((state) => state.view);
  const handleResize = _.throttle(() => {
    dispatch(viewActions.setIsMobile(window.innerWidth < 1025));
  }, 300);
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logout = (e) => {
    dispatch(userActions.logoutFB());
  };

  const moveToPage = (path) => (e) => {
    setOpenMenu(false);
    history.push(path);
  };
  return (
    <>
      <Nav>
        <Logo onClick={() => history.replace('/')}>My Taste</Logo>
        {!isMobile && <Login isNav moveSignUpPage={moveToPage('/signup')} />}
        <Menu isOpen={openMenu}>
          <li onClick={moveToPage('/basket')}>
            <Permit>basket</Permit>
          </li>
          <li onClick={moveToPage('/search')}>search</li>

          <li onClick={moveToPage('/feed')}>feed</li>
          <li onClick={moveToPage('/calendar')}>calendar</li>
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
      <Hamburger onClick={() => setOpenMenu(!openMenu)}>
        <I size="1.5em">
          <FaBars />
        </I>
      </Hamburger>
    </>
  );
};

Navbar.defaultProps = {};

const Nav = styled.div`
  ${(props) => props.theme.border_box};
  background-color: ${(props) => props.theme.color.gray_light};
  color: #ffeb60;
  font-family: var(--ballo);
  display: flex;
  flex-direction: column;
  padding: 8px 12px;
  height: 100%;
  align-items: flex-start;
  width: 100%;
  max-width: 350px;

  @media ${(props) => props.theme.desktop} {
    justify-content: space-around;
    width: 25%;
    margin: 4rem;
    border-bottom-left-radius: 2.5rem;
    border-top-right-radius: 2.5rem;
    height: 85vh;
  }
`;

const Logo = styled.div`
  cursor: pointer;
  text-align: center;
  font-size: 1.5em;
  line-height: 3.5vw;
  margin: 5px 20px;

  ${(props) => props.theme.flex_column}
  justify-content:center;
  align-items: center;
  color: ${(props) => props.theme.main_white};

  @media ${(props) => props.theme.mobile} {
    //${(props) => props.theme.flex_column}
  }
`;

const Menu = styled.ul`
  transition: 0.3s;
  list-style: none;
  padding-left: 0;
  cursor: pointer;
  font-size: 1.5em;
  width: 100%;

  ${(props) => props.theme.flex_column};
  transition: 0.3s all;
  & li {
    margin: 5px;
    &:hover {
      transform: skew(-15deg);
    }
  }
  @media ${(props) => props.theme.mobile} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
  }

  @media ${(props) => props.theme.tablet} {
    display: ${(props) => (props.isOpen ? '' : 'none')};
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
  & span {
    color: white;
  }
  ${(props) => props.theme.flex_row}
`;

const Hamburger = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;

  @media ${(props) => props.theme.desktop} {
    display: none;
  }
`;

export default Navbar;
