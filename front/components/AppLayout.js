import propTypes from 'prop-types';
import Menu from './Menu';
import '../styles/pageLayout.scss'
import Link from 'next/Link';
import { useCallback } from 'react';
import { useDispatch } from "react-redux";



const AppLayout = ({children})=>{
    const dispatch = useDispatch();
   
    return (
      <div className="container">
        <nav>
          <div className="title">
            <Link href="/">
              <a>
                My <br />
                Taste
              </a>
            </Link>
          </div>
            {/* <Menu /> */}
          <div className="Menu">
              <ul>
                  <li>
                      <Link href="/bookSearch">
                          <a>Search</a>
                      </Link>
                  </li>
                  <li>
                      <Link href="/bookBasket">
                          <a>Basket</a>
                      </Link>
                  </li>
                  <li>
                      <Link href="/bookDiary">
                          <a>Diary</a>
                      </Link>
                  </li>
              </ul>
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