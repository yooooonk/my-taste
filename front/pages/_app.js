import propTypes from 'prop-types';

const App = ({Component})=>{
    return(
        <Component />
    )
}

App.propTypes = {
    Component : propTypes.elementType.isRequired
}


export default App;