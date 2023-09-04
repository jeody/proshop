import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ManagerRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo && userInfo.isManager ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default ManagerRoute;
