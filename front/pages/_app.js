import propTypes from 'prop-types';
import '../styles/utils.scss'
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import 'antd/dist/antd.css';

const App = ({Component})=>{
    return(
        <>
        <Head>
            <meta charSet="utf-8" />
            <title>My BooooK</title>
        </Head>
        <AppLayout>
            <Component />
        </AppLayout>
        
        </>
    )
}

App.propTypes = {
    Component : propTypes.elementType.isRequired
}


export default App;