import React, {FC} from 'react';
import {useSelector} from '../../components/hook/redux';
import { Navigate, useLocation } from 'react-router';
import { auth } from '../../services/selectors';

type TProps={
  onlyUnAuth: boolean;
  element: React.ReactNode;
}
const Protected : FC <TProps>= ({ onlyUnAuth = false, element }) => {
  
  const {requestStart, userLoggedIn, user} = useSelector(auth);
  const location = useLocation();
  
  if (!userLoggedIn && requestStart) {
    
    return <p>Загрузка </p>;
  }
 
  if (onlyUnAuth && user ) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

 

  return element;
};


export const OnlyAuth = Protected;
export const OnlyUnAuth : FC <TProps>= ({ element }) => (
  <Protected onlyUnAuth={true} element={element} />
);

