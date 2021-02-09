import propTypes from 'prop-types';
import Menu from './Menu';
import '../styles/pageLayout.scss'
import Link from 'next/Link';


const AppLayout = ({children})=>{

    return (
      <div className="container">
        <nav>
          <div className="title">
            <Link href="/">
              <a>
                My <br />
                BoooooK
              </a>
            </Link>
          </div>
          <div className="menu">
            <Menu />
          </div>
          <div className="copyright">@yoooonk</div>
        </nav>
        <section className="main">{children}</section>
      </div>
    );
};

AppLayout.propTypes = {
    children : propTypes.node.isRequired
};

export default AppLayout;