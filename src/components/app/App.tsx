import AppHeader from "../app-header/app-header";
import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "../../pages/main/main.jsx";
import { Register } from "../../pages/register/register.jsx";
import { Login } from "../../pages/login/login.jsx";
import { ForgotPassword } from "../../pages/forgot-password/forgot-password.jsx";
import { ResetPassword } from "../../pages/reset-password/reset-password.js";
import { Profile } from "../../pages/profile/profile.js";
import { NotFound404 } from "../../pages/404/404.jsx";
import { ProfileEdit } from "../../pages/profile-edit/profile-edit.js";
import { ProfileOrders } from "../../pages/profile-orders/profile-orders.jsx";
import { ProfileLogout } from "../../pages/profile-logout/profile-logout.jsx";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page.js";
import { useDispatch } from "react-redux";
import { authGetUserAction } from "../../services/actions/auth.js";
import { useEffect } from "react";
import { OnlyAuth, OnlyUnAuth } from "../routes/auth-route.jsx";
import { loadIngredientsAction } from "../../services/actions/burger-ingredients.js";
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import { useNavigate } from "react-router-dom";

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
        <Route
          path={`/ingredients/:ingredientId`}
          element={<IngredientPage />}
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
        </Routes>
      )}
    </>
  );
}

export default App;
