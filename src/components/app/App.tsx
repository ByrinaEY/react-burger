import AppHeader from "../app-header/app-header";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../../pages/main/main";
import { Register } from "../../pages/register/register";
import { Login } from "../../pages/login/login";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { NotFound404 } from "../../pages/404/404";
import { ProfileEdit } from "../../pages/profile-edit/profile-edit";
 import  ProfileOrders  from "../../pages/profile-orders/profile-orders";
import { ProfileLogout } from "../../pages/profile-logout/profile-logout";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page";
import OrderList from "../../pages/order-list/order-list";
import { useDispatch } from "react-redux";
import { authGetUserAction } from "../../services/actions/auth";
import { useEffect } from "react";
import { OnlyAuth, OnlyUnAuth } from "../routes/auth-route";
import { loadIngredientsAction } from "../../services/actions/burger-ingredients";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useNavigate } from "react-router-dom";
import OrderPage from '../order-page/order-page';
import OrderInfo from '../order-info/order-info';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(loadIngredientsAction() as any);
  }, [dispatch]);

  useEffect(() => {
    dispatch(authGetUserAction() as any);
  }, []);

  const id = location.pathname.slice(13);

  function closeModalWindow() {
    navigate(-1);
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/feed" element={<OrderList />} />
        <Route
          path={`/ingredients/:ingredientId`}
          element={<IngredientPage />}
        />
         <Route
          path={`/feed/:id`}
          element={<OrderPage/>}
        />
        <Route
          path="/register"
          element={<OnlyUnAuth component={<Register />} onlyUnAuth={true} />}
        />
        <Route
          path="/login"
          element={<OnlyUnAuth component={<Login />} onlyUnAuth={true} />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={<OnlyAuth component={<Profile />} onlyUnAuth={false} />}
        >
          <Route index element={<ProfileEdit />} />
          <Route path="orders" element={<ProfileOrders />} />
          <Route path="logout" element={<ProfileLogout />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
           
          <Route
            path="/ingredients/:ingredientId"
            element={
              <Modal title={"Детали ингредиента"} onClose={closeModalWindow}>
                <IngredientDetails id={id} />
              </Modal>
            }
          />
           <Route
          path="/feed/:id"
          element={
            <Modal title={""} onClose={closeModalWindow}>
              <OrderInfo/>
            </Modal>
          }
        />
        </Routes>
      )}  
    </>
  );
}

export default App;
