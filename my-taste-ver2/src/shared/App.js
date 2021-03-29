import { Grid, Image, Text } from '../elements';
import './App.css';

function App() {
  return (
    <div className="App">
      <Grid is_flex>
        <Grid bg="yellow" width="30%">
          <Image is_circle></Image>
        </Grid>
        <Grid bg="yellow" width="30%">
          <Image is_circle></Image>
        </Grid>
        <Grid bg="yellow" width="30%">
          <Text bold>zzz</Text>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
