import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { auth } from '../../services/selectors';

export default function AuthRoute ({ element }) {
    const { userLoggedIn } = useSelector(auth);

  return ( userLoggedIn ) ? (
    <Navigate to="/"  replace/> 
  ) : (
    element
  );
};