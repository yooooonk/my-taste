import './App.css';
import { Grid } from '../elements';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import PostList from '../pages/PostList';
import Login from '../components/Login';
import Signup from '../pages/Signup';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from './firebase';
import { useEffect } from 'react';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Notification from '../pages/Notification';
import AppLayout from '../components/AppLayout';
import Home from '../pages/Home';
import Search from '../pages/Search';

function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    console.log('로그인유지');
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <AppLayout>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/search" exact component={Search} />
        <Route path="/feed" exact component={PostList} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/write/:id" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path="/noti" exact component={Notification} />
      </ConnectedRouter>
    </AppLayout>
  );
}

export default App;
