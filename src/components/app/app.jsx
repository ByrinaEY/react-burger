import AppHeader from '../app-header/app-header.jsx';
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main.jsx';
import { Register } from '../../pages/register/register.jsx';
import { Login } from '../../pages/login/login.jsx';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password.jsx';
import { ResetPassword } from '../../pages/reset-password/reset-password.jsx';
import { Profile } from '../../pages/profile/profile.jsx';
import { NotFound404 } from '../../pages/404/404.jsx';
import ProtectedRoute from "../protected-route.jsx";
import { ProfileEdit } from '../../pages/profile-edit/profile-edit.jsx';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders.jsx';
import { ProfileLogout } from '../../pages/profile-logout/profile-logout.jsx';
import {IngredientPage} from '../../pages/ingredient-page/ingredient-page.jsx';


function App() {
   return (
      <main>
         <>
            <Router>
               <AppHeader />
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path={`/ingredients/:id`} element={<IngredientPage />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/profile" element={<ProtectedRoute element={<Profile />} />}>
                     <Route index element={<ProfileEdit />} />
                     <Route path="orders" element={<ProfileOrders />} />
                     <Route path="logout" element={<ProfileLogout />} />
                     <Route path="*" element={<NotFound404 />} />
                  </Route>
                  <Route path="*" element={<NotFound404 />} />

               </Routes>
            </Router>

         </>
      </main>
   )
}

export default App


