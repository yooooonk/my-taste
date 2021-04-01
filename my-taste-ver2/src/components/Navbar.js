import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { I } from '../elements';
import { history } from '../redux/configStore';
import Permit from '../shared/Permit';
import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as viewActions } from '../redux/modules/view';
import NotiBadge from './NotiBadge';
import styled from 'styled-components';
import { FaAppleAlt, FaPowerOff, FaKissWinkHeart } from 'react-icons/fa';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import _ from 'lodash';
import LayoutPicker from './LayoutPicker';
const Navbar = (props) => {
  const dispatch = useDispatch();
  const { isMobile, layout } = useSelector((state) => state.view);
  const handleResize = _.throttle(() => {
    dispatch(viewActions.setIsMobile(window.innerWidth < 1025));
  }, 300);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const logout = (e) => {
    dispatch(userActions.logoutFB());
  };
  return (
    <React.Fragment>
      <Nav>
        <Logo onClick={() => history.push('/')}>
          <FaAppleAlt />
          My Taste
        </Logo>
        <Menu>
          <li onClick={() => history.push('/search')}>search</li>
          <li onClick={() => history.push('/feed')}>feed</li>
          <li onClick={() => history.push('/write')}>
            <Permit>write</Permit>
          </li>

          {/* <div>basket</div>
          <div>search</div> */}
        </Menu>
        {!isMobile && <LayoutPicker />}
        <Icons>
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
                  <NotiBadge />
                </IconButton>
              </Tooltip>
              <Tooltip title="로그아웃">
                <IconButton aria-label="delete" onClick={logout}>
                  <FaPowerOff className="icon" />
                </IconButton>
              </Tooltip>
            </Btns>
          </Permit>
        </Icons>
      </Nav>
    </React.Fragment>
  );
};

Navbar.defaultProps = {};

const Nav = styled.div`
  color: ${(props) => props.theme.main_white};
  font-family: var(--ballo);
  display: flex;
  align-items: center;
  padding: 8px 12px;

  /*   & .icon {
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
  } */
`;

const Logo = styled.div`
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

const Menu = styled.ul`
  transition: 0.3s;

  cursor: pointer;
  & span {
    margin: 5px;
    &:hover {
      transform: skew(-15deg);
    }
  }
  @media ${(props) => props.theme.mobile} {
    ${(props) => props.theme.flex_row};
    font-size: 1em;
  }

  @media ${(props) => props.theme.tablet} {
    ${(props) => props.theme.flex_row};
    font-size: 1.5em;
  }

  @media ${(props) => props.theme.desktop} {
    ${(props) => props.theme.flex_column};
    justify-content: center;
    font-size: 1.5em;
  }
`;

const Btns = styled.div`
  ${(props) => props.theme.flex_row}
`;

const Icons = styled.div``;
export default Navbar;
