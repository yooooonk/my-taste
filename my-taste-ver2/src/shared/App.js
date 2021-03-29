import Navbar from '../components/Navbar';
import { Grid } from '../elements';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PostList from '../components/PostList';
import { history } from '../redux/configStore';
import Login from '../components/Login';
import Signup from '../components/Signup';

function App() {
  return (
    <div className="App">
      <Grid is_flex is_column>
        <Navbar />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
