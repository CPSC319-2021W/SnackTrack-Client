import { useLocation, withRouter } from 'react-router-dom';
import { useEffect } from 'react';

const PageScroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default withRouter(PageScroll);