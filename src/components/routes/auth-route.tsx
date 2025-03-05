import React, {FC} from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';
import { auth } from '../../services/selectors';

type TProps={
  onlyUnAuth: boolean;
  component: React.ReactNode;
}
const Protected : FC <TProps>= ({ onlyUnAuth = false, component }) => {
  
  const {requestStart, userLoggedIn, user} = useSelector(auth);
  const location = useLocation();
  
  if (!userLoggedIn && requestStart) {
    
    return <p>Загрузка </p>;
  }
 
  if (onlyUnAuth && user.name ) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user.name) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

 

  return component;
};


export const OnlyAuth = Protected;
export const OnlyUnAuth : FC <TProps>= ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

