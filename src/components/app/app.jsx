import AppHeader from '../app-header/app-header.jsx';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from '../../pages/main/main.jsx';
import { Register } from '../../pages/register/register.jsx';
import { Login } from '../../pages/login/login.jsx';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password.jsx';
import { ResetPassword } from '../../pages/reset-password/reset-password.jsx';
import { Profile } from '../../pages/profile/profile.jsx';
import { NotFound404 } from '../../pages/404/404.jsx';
import ProtectedRoute from "../routes/protected-route.jsx";
import AuthRoute from "../routes/auth-route.jsx";
import { ProfileEdit } from '../../pages/profile-edit/profile-edit.jsx';
import { ProfileOrders } from '../../pages/profile-orders/profile-orders.jsx';
import { ProfileLogout } from '../../pages/profile-logout/profile-logout.jsx';
import {IngredientPage} from '../../pages/ingredient-page/ingredient-page.jsx';



function App() {
   const location = useLocation();
   
   const background = location.state && location.state.background;
   

     
   return (
         <>
                  <AppHeader />
                  <Routes location={background || location}>
                     <Route path="/" element={<MainPage />} />
                     <Route path={`/ingredients/:ingredientId`} element={<IngredientPage />} />
                     <Route path="/register" element={<AuthRoute element={<Register />} />}/>
                     <Route path="/login" element={<AuthRoute element={<Login />} />}/> 
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

                 
               </>
 
   )
}

export default App


