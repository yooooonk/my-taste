import propTypes from 'prop-types';
import '../styles/utils.scss'
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import 'antd/dist/antd.css';
import wrapper from '../modules/index';
import withReduxSaga from 'next-redux-saga'

const App = ({Component})=>{
    return(
        <>
        <Head>
            <meta charSet="utf-8" />
            <title>My Taste</title>
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



export default wrapper.withRedux(withReduxSaga(App));