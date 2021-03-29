import Navbar from '../components/Navbar';
import { Button, Grid, Image, Text } from '../elements';
import './App.css';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import PostList from '../components/PostList';
import { history } from '../redux/configStore';

function App() {
  return (
    <div className="App">
      <Grid is_flex>
        <Navbar />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={PostList} />
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
