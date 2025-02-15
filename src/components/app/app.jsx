import AppHeader from '../app-header/app-header.jsx';
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main/main.jsx';
import {Register} from '../../pages/register/register.jsx';
import {Login} from '../../pages/login/login.jsx';
import {ForgotPassword} from '../../pages/forgot-password/forgot-password.jsx';  
import {ResetPassword} from '../../pages/reset-password/reset-password.jsx';
import {Profile} from '../../pages/profile/profile.jsx';


function App() {
   return (
    <main>
       <>
           <AppHeader />
           <div className={styles.main}>
            <Router>
            <Routes>
               <Route path="/" element={<MainPage />}/>
               <Route path="/register" element={<Register />}/>
               <Route path="/login" element={<Login />}/>
               <Route path="/forgot-password" element={<ForgotPassword />}/>
               <Route path="/reset-password" element={<ResetPassword />}/>
               <Route path="/profile" element={<Profile />}/>

            </Routes>
            </Router>
            </div>
          </>
    </main>
  )
}

export default App


