import './App.css';
import { Grid } from '../elements';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configStore';

import Navbar from '../components/Navbar';
import PostList from '../components/PostList';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { apiKey } from './firebase';
import { useEffect } from 'react';
import PostWrite from '../components/PostWrite';
function App() {
  const dispatch = useDispatch();

  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const is_session = sessionStorage.getItem(_session_key) ? true : false;

  useEffect(() => {
    if (is_session) {
      dispatch(userActions.loginCheckFB());
    }
  }, []);

  return (
    <div className="App">
      <Grid is_flex is_column>
        <Navbar />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/write" exact component={PostWrite} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
