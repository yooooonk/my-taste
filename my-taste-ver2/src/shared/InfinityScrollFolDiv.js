import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import Spinner from '../elements/Spinner';

const InfinityScrollFolDiv = (props) => {
  const { children, callNext, is_next, loading, _onScroll } = props;

  /*  React.useEffect(() => {
    if (loading) return;
    if (is_next) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [is_next, loading]); */
  return (
    <div>
      {children}
      {is_next && <Spinner />}
    </div>
  );
};

export default InfinityScrollFolDiv;
