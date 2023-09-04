import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {userInfo && <Header />}
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
