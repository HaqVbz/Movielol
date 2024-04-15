import PropTypes from 'prop-types';
import Navbar from "./Navbar";
import Footer from './Footer';


const Layout = ({children}) => {
  return (
    <>     
        <Navbar />
        <main>
            {children}
        <Footer />
        </main>
    </>
  );
};

Layout.PropTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;